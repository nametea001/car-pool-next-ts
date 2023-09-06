import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { NextApiResponseServerIO } from "../../../src/Domain/SocketIO/Type/SocketIOType";
import { ChatDetailUpdater } from "../../../src/Domain/ChatDetail/Service/ChatDetailUpdater";
import { ChatUserLogUpdater } from "../../../src/Domain/ChatUserLog/Service/ChatUserLogUpdater";
import { PostMemberFinder } from "../../../src/Domain/PostMember/Service/PostMemberFinder";

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
      // const chatUpdater = new ChatUpdater();
      // let chatData = await chatUpdater.updateChat(
      //   {},
      //   chatDetailData.chat_id,
      //   tokenVerify
      // );

      viewData.message = "Insert Chat Detail and Update Chat Successful";
      viewData.error = false;
      viewData.chat_detail = chatDetailData;
      res.status(200).send(viewData);
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
      const chatUserLogUpdater = new ChatUserLogUpdater();
      if (dataBody.chat_type === "PRIVATE") {
        let sendToUserID =
          dataBody.send_user_id !== tokenVerify.id
            ? dataBody.send_user_id
            : dataBody.created_user_id;

        let dataChatUserLog = await chatUserLogUpdater.insertChatUserLog(
          { chat_id: dataBody.chat_id, user_id: sendToUserID },
          tokenVerify.id
        );
        if (dataChatUserLog) {
          let socketChat = "chat_user_" + sendToUserID;
          let sockPost = "user_" + sendToUserID;
          res?.socket?.server?.io?.emit(socketChat, "Update_UI");
          res?.socket?.server?.io?.emit(sockPost, "Update_UI");
        }
      } else {
        const postMemerFinder = new PostMemberFinder();
        let dataPostMemers = await postMemerFinder.findPostMembersByPostID(
          dataBody.send_post_id
        );
        if (dataPostMemers) {
          let dataChatUserLog = await chatUserLogUpdater.insertManyChatUserLog(
            dataBody.chat_id,
            dataPostMemers,
            tokenVerify.id
          );
          if (dataChatUserLog) {
            dataPostMemers.forEach((dataPostMemer: any) => {
              let socketChat = "chat_user_" + dataPostMemer.id;
              let sockPost = "user_" + dataPostMemer.id;
              res?.socket?.server?.io?.emit(socketChat, "Update_UI");
              res?.socket?.server?.io?.emit(sockPost, "Update_UI");
            });
          }
        }
      }
    } else {
      res.status(401).send("null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
}
