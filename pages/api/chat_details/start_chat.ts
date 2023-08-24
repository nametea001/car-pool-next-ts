import type { NextApiRequest, NextApiResponse } from "next";

import { ChatFinder } from "../../../src/Domain/Chat/Service/ChatFinder";
import { ChatDetailFinder } from "../../../src/Domain/ChatDetail/Service/ChatDetailFinder";
import { ChatUpdater } from "../../../src/Domain/Chat/Service/ChatUpdater";
import { JWT } from "../../../src/Auth/JWT";

export default async function getPostDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam: any = req.query;
  const dataBody: any = req.body;
  let viewData: any = {};
  const jwt = new JWT();
  //   const token = req.headers["auth-token"];
  //   const tokenVerify = jwt.verifyToken(token);
  let tokenVerify = true;
  if (req.method == "POST" && tokenVerify) {
    const chatFinder = new ChatFinder();
    const chatDetail = new ChatDetailFinder();

    let chatData = await chatFinder.getChatForStart(dataBody);
    if (chatData) {
      let chatDetailsData = await chatDetail.getChatDetailByChatID(chatData.id);
      viewData.message = "Get ChatDetail Successful";
      viewData.error = false;
      viewData.chat_details = chatDetailsData;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("Null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
}
