import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { ChatUserLogFinder } from "../../../src/Domain/ChatUserLog/Service/ChatUserLogFinder";

export default async function countUser(
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
    let chatUserLogData = await chatUserLogFinder.countChatUserLogsByUserID(
      tokenVerify.id
    );
    if (chatUserLogData) {
      viewData.message = "Get Count Chat User Log Successful";
      viewData.error = false;
      viewData.chat_user_log = chatUserLogData;
      res.status(200).send(viewData);
      return;
    } else {
      res.status(401).send("null data");
      return;
    }
  } else {
    res.status(400).send("Bad request");
    return;
  }
}
