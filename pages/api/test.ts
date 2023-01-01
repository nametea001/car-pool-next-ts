import type { NextApiRequest, NextApiResponse } from "next";

import { Userfinds } from "../../src/Action/UserFindAction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.query;
  let viewData: any = null;
  let users = await Userfinds(data);
  res.status(200).send(users);
}
