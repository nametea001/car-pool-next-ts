import type { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIO } from "../../../src/Domain/SocketIO/Type/SocketIOType";
import { PostFinder } from "../../../src/Domain/Post/Service/PostFinder";
import { PostUpdater } from "../../../src/Domain/Post/Service/PostUpdater";
import { ChatDetailUpdater } from "../../../src/Domain/ChatDetail/Service/ChatDetailUpdater";
import { ChatUpdater } from "../../../src/Domain/Chat/Service/ChatUpdater";
import { ChatUserLogUpdater } from "../../../src/Domain/ChatUserLog/Service/ChatUserLogUpdater";
import { ReviewUserLogUpdater } from "../../../src/Domain/ReviewUserLog/Service/ReviewUserLogUpdater";
import { JWT } from "../../../src/Auth/JWT";

export default async function addPost(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  const dataParam: any = req.query;
  const dataBody: any = req.body;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  let postID: any = null;
  try {
    postID = Number(dataBody.post_id);
  } catch (err) {
    postID = null;
  }
  if (req.method == "PUT" && tokenVerify && postID != null) {
    const postFinder = new PostFinder();
    const postUpdater = new PostUpdater();
    let dataCheckStatus: any = await postFinder.findStatusPostByID(
      Number(dataBody.post_id)
    );
    if (
      (dataCheckStatus.status === "IN_PROGRESS" &&
        dataBody.status === "DONE") ||
      (dataCheckStatus.status !== "DONE" &&
        dataCheckStatus.status !== "CANCEL" &&
        dataBody.status === "CANCEL")
    ) {
      let post = await postUpdater.updatePosts(
        { id: Number(dataBody.post_id) },
        dataBody,
        tokenVerify.id
      );
      if (post) {
        if (post.post_members.length > 1) {
          const chatUpdater = new ChatUpdater();
          const chatDetailUpdater = new ChatDetailUpdater();
          const chatUserLogUpdater = new ChatUserLogUpdater();

          let chatUpdateData: any = await chatUpdater.updateChatByPostID(
            {},
            post.id,
            tokenVerify.id
          );
          if (chatUpdateData != null && chatUpdateData.length > 0) {
            let dataCreatedChatDetail = {};
            if (post.status === "DONE") {
              const reviewUserLogUpdater = new ReviewUserLogUpdater();
              await reviewUserLogUpdater.insertManyReviewUserLog(
                post.id,
                post.post_members,
                tokenVerify.id
              );
              dataCreatedChatDetail = {
                chat_id: chatUpdateData.id,
                msg_type: "MSG",
                msg: "การเดินทางสำเร็จ โปรดให้คะแนน",
              };
            } else if (post.status === "CANCEL") {
              dataCreatedChatDetail = {
                chat_id: chatUpdateData.id,
                msg_type: "MSG",
                msg: "การเดินทาถูกยกเลิก",
              };
            }
            let chatDetailData = await chatDetailUpdater.insertChatDetail(
              dataCreatedChatDetail,
              tokenVerify.id
            );
            if (chatDetailData) {
              let dataChatUserLog =
                await chatUserLogUpdater.insertManyChatUserLog(
                  chatUpdateData.id,
                  post.post_members,
                  tokenVerify.id
                );
              res?.socket?.server?.io?.emit(
                "active_chat_detail_" + chatDetailData.chat_id,
                JSON.stringify({
                  user_id: tokenVerify.id,
                  error: false,
                  chat_detail: chatDetailData,
                })
              );
              if (dataChatUserLog.count > 0) {
                post.post_members.forEachforEach((user: any) => {
                  let socketChat = "chat_user_" + user.user_id;
                  let socketPost = "user_" + user.user_id;
                  res?.socket?.server?.io?.emit(socketChat, "Update_UI");
                  res?.socket?.server?.io?.emit(socketPost, "Update_Noti");
                });
              }
            }
          }
        }
        res?.socket?.server?.io?.emit("server_post", post.id);
        viewData.message = "Update Post Successful";
        viewData.error = false;
        viewData.post = post;
        res.status(200).send(viewData);
      } else {
        res.status(401).send("Status err");
      }
    } else {
      res.status(401).send("Null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
