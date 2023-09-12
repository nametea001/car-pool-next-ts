import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../../src/Auth/JWT";
import { ChatUserLogUpdater } from "../../../../src/Domain/ChatUserLog/Service/ChatUserLogUpdater";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { chat_id } = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "DELETE" && tokenVerify) {
    if (true) {
      viewData.message = "Get Car Successful";
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
