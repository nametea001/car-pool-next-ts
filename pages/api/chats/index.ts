import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { ChatFinder } from "../../../src/Domain/Chat/Service/ChatFinder";

export default async function getChats(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const dataParam: {} = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "GET" && tokenVerify) {
    const chatFinder = new ChatFinder();
    let chatData = await chatFinder.findChats(tokenVerify.id);
    if (chatData) {
      viewData.message = "Get Car Successful";
      viewData.error = false;
      viewData.chats = chatData;
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
