import type { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIO } from "../../../src/Domain/SocketIO/Type/SocketIOType";

import { PostMemberFinder } from "../../../src/Domain/PostMember/Service/PostMemberFinder";
import { PostMemberUpdater } from "../../../src/Domain/PostMember/Service/PostMemberUpdater";
import { ChatDetailUpdater } from "../../../src/Domain/ChatDetail/Service/ChatDetailUpdater";
import { ChatFinder } from "../../../src/Domain/Chat/Service/ChatFinder";

import { JWT } from "../../../src/Auth/JWT";
import { ChatUpdater } from "../../../src/Domain/Chat/Service/ChatUpdater";

export default async function getPostDetails(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  const dataParam: any = req.query;
  const dataBody: any = req.body;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "POST" && tokenVerify) {
    const postMemberFinder = new PostMemberFinder();
    const postMemberUpdater = new PostMemberUpdater();
    let whereData = { post_id: Number(dataBody.post_id) };
    let getPostMemberForcheckJoin =
      await postMemberFinder.findPostMemberForCheckJoin(whereData);

    if (getPostMemberForcheckJoin.length !== 0) {
      let countMember = 0;
      let isMember = false;
      let seat = getPostMemberForcheckJoin[0].posts.post_details.seat;
      getPostMemberForcheckJoin.forEach((data: any) => {
        countMember++;
        if (Number(tokenVerify.id) === data.user_id) {
          isMember = true;
        }
      });
      if (!isMember && countMember < seat) {
        let dataInsert = {
          post_id: dataBody.post_id,
          user_id: tokenVerify.id,
        };
        let postMember = await postMemberUpdater.postMemberInsert(dataInsert);

        if (postMember) {
          const chatFinder = new ChatFinder();
          let chatData = await chatFinder.getChatForStart({
            chat_tyoe: "PRIVATE",
            send_post_id: postMember.post_id,
          });
          let dataChatDetail: any;
          const chatDetailUpdater = new ChatDetailUpdater();
          if (chatData) {
            let dataUpdateChatDetail = {
              chat_id: chatData.id,
              msg_type: "MSG",
              MSG: `${tokenVerify.first_name} ได้เข้ารวมการเดินทาง`,
              lat_lng: null,
            };
            dataChatDetail = await chatDetailUpdater.insertChatDetail(
              dataUpdateChatDetail,
              tokenVerify.id
            );
          } else {
            const chatUpdater = new ChatUpdater();
            let dataInsertChat = {
              chat_type: "GROUP",
              send_user_id: null,
              send_post_id: postMember.post_id,
            };
            let chatDataCreated = await chatUpdater.inserChat(
              dataInsertChat,
              tokenVerify.id
            );
            let dataUpdateChatDetail = {
              chat_id: chatDataCreated.id,
              msg_type: "MSG",
              MSG: `${tokenVerify.first_name} ได้เข้ารวมการเดินทาง`,
              lat_lng: null,
            };
            dataChatDetail = await chatDetailUpdater.insertChatDetail(
              dataUpdateChatDetail,
              tokenVerify.id
            );
          }
          let socketChatDetail = "active_chat_detail_" + dataChatDetail.chat_id;
          res?.socket?.server?.io?.emit(
            socketChatDetail,
            JSON.stringify({
              user_id: tokenVerify.id,
              error: false,
              chat_detail: dataChatDetail,
            })
          );
          getPostMemberForcheckJoin.forEach((dataPostMemer: any) => {
            let socketChat = "chat_user_" + dataPostMemer.user_id;
            let socketPost = "user_" + dataPostMemer.user_id;
            res?.socket?.server?.io?.emit(socketChat, "Update_UI");
            res?.socket?.server?.io?.emit(socketPost, "Update_Noti");
          });
        }
        res?.socket?.server?.io?.emit("server_post", postMember.post_id);
        viewData.message = "Insert Post Member Successful";
        viewData.error = false;
        viewData.post_members = postMember;
        res.status(200).send(viewData);
      } else {
        viewData.message = "Insert Post Member Fail";
        viewData.error = true;
        res.status(200).send(viewData);
      }
    } else {
      res.status(401).send("Null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
