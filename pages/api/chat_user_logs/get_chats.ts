import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { ChatUserLogFinder } from "../../../src/Domain/ChatUserLog/Service/ChatUserLogFinder";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam: any = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "GET" && tokenVerify) {
    const chatUserLogFinder = new ChatUserLogFinder();
    let chatUserLogData =
      await chatUserLogFinder.getChatUserLogAndChatByUserUserID(tokenVerify.id);
    if (chatUserLogData) {
      viewData.message = "Get Chats From Chat User Log Successful";
      viewData.error = false;
      viewData.chat_user_logs = chatUserLogData;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
