import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { NextApiResponseServerIO } from "../../../src/Domain/SocketIO/Type/SocketIOType";
import { ChatDetailUpdater } from "../../../src/Domain/ChatDetail/Service/ChatDetailUpdater";
import { ChatUserLogUpdater } from "../../../src/Domain/ChatUserLog/Service/ChatUserLogUpdater";
import { PostMemberFinder } from "../../../src/Domain/PostMember/Service/PostMemberFinder";
import { ChatUpdater } from "../../../src/Domain/Chat/Service/ChatUpdater";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  // const dataParam: {} = req.query;
  const dataBody: any = req.body;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "POST" && tokenVerify) {
    const chatDetailUpdater = new ChatDetailUpdater();
    let chatDetailData = await chatDetailUpdater.insertChatDetail(
      dataBody,
      tokenVerify.id
    );
    if (chatDetailData) {
      const chatUpdater = new ChatUpdater();
      let chatData = await chatUpdater.updateChatSendMsg(
        {},
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
          dataBody.send_user_id !== tokenVerify.id
            ? dataBody.send_user_id
            : dataBody.created_user_id;

        let dataChatUserLog = await chatUserLogUpdater.insertChatUserLog(
          { chat_id: dataBody.chat_id, user_id: sendToUserID },
          tokenVerify.id
        );
        if (dataChatUserLog) {
          res?.socket?.server?.io?.emit("test", "0");
          let socketPost = "user_" + sendToUserID;
          let socketChat = "chat_user_" + sendToUserID;
          res?.socket?.server?.io?.emit(socketPost, "Update_Noti");
          res?.socket?.server?.io?.emit(socketChat, "Update_UI");
        }
      } else {
        const postMemerFinder = new PostMemberFinder();
        let dataPostMemers: [] =
          await postMemerFinder.findPostMembersByPostIDAndNotOwner({
            post_id: dataBody.send_post_id,
            user_id: tokenVerify.id,
          });
        if (dataPostMemers) {
          let dataChatUserLog = await chatUserLogUpdater.insertManyChatUserLog(
            dataBody.chat_id,
            dataPostMemers,
            tokenVerify.id
          );
          if (dataChatUserLog.count > 0) {
            dataPostMemers.forEach((dataPostMemer: any) => {
              let socketChat = "chat_user_" + dataPostMemer.user_id;
              let socketPost = "user_" + dataPostMemer.user_id;
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
      res.status(401).send("null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
