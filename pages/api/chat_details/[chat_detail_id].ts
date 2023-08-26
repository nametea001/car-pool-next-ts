import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { ChatDetailFinder } from "../../../src/Domain/ChatDetail/Service/ChatDetailFinder";

export default async function getPostDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { chat_detail_id } = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify = jwt.verifyToken(token);
  let chatDetailID: any = null;
  try {
    chatDetailID = Number(chat_detail_id);
  } catch (err) {
    chatDetailID = null;
    console.log(err);
  }
  if (req.method == "GET" && tokenVerify && chatDetailID) {
    const chatDetailFinder = new ChatDetailFinder();
    let chatDetailData = await chatDetailFinder.getChatDetailByChatID(
      chatDetailID
    );
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
}
