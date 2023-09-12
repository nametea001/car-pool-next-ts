import type { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIO } from "../../../src/Domain/SocketIO/Type/SocketIOType";
import { JWT } from "../../../src/Auth/JWT";
import { ChatDetailFinder } from "../../../src/Domain/ChatDetail/Service/ChatDetailFinder";
import { ChatUserLogUpdater } from "../../../src/Domain/ChatUserLog/Service/ChatUserLogUpdater";

export default async function getPostDetails(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  const { chat_id } = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  let chatID: any = null;
  try {
    chatID = Number(chat_id);
  } catch (err) {
    chatID = null;
    console.log(err);
  }
  if (req.method == "GET" && tokenVerify && chatID) {
    const chatDetailFinder = new ChatDetailFinder();
    const chatUserLogUpdater = new ChatUserLogUpdater();
    let dataChatUserLog = await chatUserLogUpdater.DeleteByChatIDAndUserID({
      user_id: tokenVerify.id,
      chat_id: chatID,
    });
    if (dataChatUserLog > 0) {
      res?.socket?.server?.io?.emit("user_" + tokenVerify.id, "Update_Noti");
      // res?.socket?.server?.io?.emit("chat_user_" + tokenVerify.id, "Update_UI");
    }
    let chatDetailData = await chatDetailFinder.getChatDetailByChatID(chatID);
    if (chatDetailData) {
      viewData.message = "Get PostDetail Successful";
      viewData.error = false;
      viewData.chat_details = chatDetailData;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("Null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
