import type { NextApiRequest, NextApiResponse } from "next";

import { ChatFinder } from "../../../src/Domain/Chat/Service/ChatFinder";
import { ChatUpdater } from "../../../src/Domain/Chat/Service/ChatUpdater";
import { ChatDetailFinder } from "../../../src/Domain/ChatDetail/Service/ChatDetailFinder";
import { ChatDetailUpdater } from "../../../src/Domain/ChatDetail/Service/ChatDetailUpdater";

import { JWT } from "../../../src/Auth/JWT";

export default async function getPostDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam: any = req.query;
  const dataBody: any = req.body;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  // let tokenVerify = true;
  if (req.method == "GET" && tokenVerify) {
    const chatFinder = new ChatFinder();
    let param = {
      chat_type: dataParam.chat_type,
      send_user_id: Number(dataParam.send_user_id),
      send_post_id: Number(dataParam.send_post_id),
      created_user_id: tokenVerify.id,
    };
    let chatData = await chatFinder.getChatForStart(param);
    if (chatData) {
      const chatDetail = new ChatDetailFinder();
      let chatDetailsData = await chatDetail.getChatDetailByChatID(chatData.id);
      viewData.message = "Get ChatDetail Successful";
      viewData.error = false;
      viewData.chat = chatData;
      viewData.chat_details = chatDetailsData;
      res.status(200).send(viewData);
    } else {
      const chatUpdater = new ChatUpdater();
      let dataInsertChat = {};
      if (param.chat_type == "PRIVATE") {
        dataInsertChat = {
          chat_type: "PRIVATE",
          send_user_id: param.send_user_id,
          send_post_id: null,
        };
      } else {
        dataInsertChat = {
          chat_type: "GROUP",
          send_user_id: null,
          send_post_id: param.send_post_id,
        };
      }
      let chatDataCreated = await chatUpdater.inserChat(
        dataInsertChat,
        tokenVerify.id
      );
      viewData.message = "Insert Chat Successful";
      viewData.error = false;
      viewData.chat = chatDataCreated;
      viewData.chat_details = {};
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
