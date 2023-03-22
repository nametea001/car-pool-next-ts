import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { PostFinder } from "../../src/Domain/Post/Service/PostFinder";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: any = req.query;
  let viewData: any = {};
  let dateTimeNow = new Date();
  viewData.datetime = dateTimeNow;
  res.status(200).send(viewData);
}
