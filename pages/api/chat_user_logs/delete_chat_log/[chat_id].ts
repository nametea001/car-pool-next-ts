import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../../src/Auth/JWT";
import { ChatUserLogUpdater } from "../../../../src/Domain/ChatUserLog/Service/ChatUserLogUpdater";

export default async function deleteByChatID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { chat_id } = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  let paramUpdate = null;
  try {
    paramUpdate = { chat_id: Number(chat_id), user_id: tokenVerify.id };
  } catch (err) {
    paramUpdate = null;
  }
  if (req.method == "DELETE" && tokenVerify) {
    const chatUserLogUpdater = new ChatUserLogUpdater();
    let dataChatUserLog = await chatUserLogUpdater.DeleteByChatIDAndUserID(
      paramUpdate
    );
    if (dataChatUserLog.count > 0) {
      viewData.message = "Delete Chat User Log  Successful";
      viewData.error = false;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
