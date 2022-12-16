import type { NextApiRequest, NextApiResponse } from "next";

import { LoginSubmitAction } from "../../src/Action/LoginSubmitAction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let viewData: any = null;
  // const data = req.query;
  let username = (req.body.username ?? "").toString();
  let password = (req.body.password ?? "").toString();
  if (req.method === "POST" && (username !== "" || password !== "")) {
    viewData = await LoginSubmitAction(username, password);
  }
  res.status(200).send(viewData);
}
