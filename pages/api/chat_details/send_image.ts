import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIO } from "../../../src/Domain/SocketIO/Type/SocketIOType";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

import { JWT } from "../../../src/Auth/JWT";
import { ChatDetailUpdater } from "../../../src/Domain/ChatDetail/Service/ChatDetailUpdater";
import { ChatUpdater } from "../../../src/Domain/Chat/Service/ChatUpdater";
import { ChatUserLogUpdater } from "../../../src/Domain/ChatUserLog/Service/ChatUserLogUpdater";
import { PostMemberFinder } from "../../../src/Domain/PostMember/Service/PostMemberFinder";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function sendImage(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  let viewData: any = {};
  let dataParam = req.query;
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method === "POST" && tokenVerify) {
    try {
      await fs.readdir(path.join(process.cwd() + "/public/chat_details"));
    } catch (error) {
      await fs.mkdir(path.join(process.cwd() + "/public/chat_details"));
    }
    const options: formidable.Options = {};
    options.uploadDir = path.join(process.cwd(), "/public/chat_details");
    options.filename = (name, ext, path, form) => {
      // return Date.now().toString() + "_" + path.originalFilename;
      let extFile = path.originalFilename!.split(".")[1];
      if (!["jpg", "jpeg", "png"].includes(extFile)) {
        throw new Error("Invalid file extension");
      }
      return tokenVerify.id + "." + extFile;
    };
    options.maxFileSize = 4000 * 1024 * 1024;
    const form = formidable(options);
    try {
      const { fields, files } = await new Promise<{
        fields: formidable.Fields;
        files: formidable.Files;
      }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });
      // return { fields, files };
      // form.parse(req);
      let file: any = files.file;
      let filename = file[0].newFilename;
      const chatDetailUpdater = new ChatDetailUpdater();
      let dataInsert = {
        chat_id: Number(dataParam.chat_id),
        msg_type: "IMG",
        msg: filename,
      };
      let chatDetailData: any = await chatDetailUpdater.insertChatDetail(
        dataInsert,
        tokenVerify.id
      );
      if (chatDetailData) {
        const chatUpdater = new ChatUpdater();
        let chatData = await chatUpdater.updateChatSendMsg(
          chatDetailData.chat_id,
          tokenVerify.id
        );

        let socketChatDetail = "active_chat_detail_" + chatDetailData.chat_id;
        let messageSocket = {
          user_id: tokenVerify.id,
          error: false,
          chat_detail: chatDetailData,
        };
        res?.socket?.server?.io?.emit(
          socketChatDetail,
          JSON.stringify(messageSocket)
        );
        // res?.socket?.server?.io?.emit("test", "0");
        const chatUserLogUpdater = new ChatUserLogUpdater();
        if (chatData.chat_type === "PRIVATE") {
          let sendToUserID =
            Number(dataParam.send_user_id) !== tokenVerify.id
              ? Number(dataParam.send_user_id)
              : Number(dataParam.created_user_id);

          let dataChatUserLog = await chatUserLogUpdater.insertChatUserLog(
            { chat_id: Number(dataParam.chat_id), user_id: sendToUserID },
            tokenVerify.id
          );
          if (dataChatUserLog) {
            let socketPost = "user_" + sendToUserID;
            let socketChat = "chat_user_" + sendToUserID;
            res?.socket?.server?.io?.emit(socketPost, "Update_Noti");
            res?.socket?.server?.io?.emit(socketChat, "Update_UI");
          }
        } else {
          const postMemerFinder = new PostMemberFinder();
          let dataPostMemers: [] =
            await postMemerFinder.findPostMembersByPostIDAndNotOwner({
              post_id: Number(dataParam.send_post_id),
              user_id: tokenVerify.id,
            });
          if (dataPostMemers) {
            let dataChatUserLog =
              await chatUserLogUpdater.insertManyChatUserLog(
                Number(dataParam.chat_id),
                dataPostMemers,
                tokenVerify.id
              );
            if (dataChatUserLog.count > 0) {
              dataPostMemers.forEach((postMemer: any) => {
                let socketChat = "chat_user_" + postMemer.user_id;
                let socketPost = "user_" + postMemer.user_id;
                res?.socket?.server?.io?.emit(socketChat, "Update_UI");
                res?.socket?.server?.io?.emit(socketPost, "Update_Noti");
              });
            }
          }
        }
        viewData.message = "Insert Chat Detail and Update Chat Successful";
        viewData.error = false;
        viewData.chat_detail = chatDetailData;
        res.status(200).send(viewData);
      } else {
        return res.status(400);
      }
    } catch (error) {
      // throw error;
      return res.status(500);
    }
  } else {
    return res.status(400);
  }
}
