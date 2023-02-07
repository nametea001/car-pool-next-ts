import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { PostFinder } from "../../src/Domain/Post/Service/PostFinder";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: any = req.query;
  let viewData: any = {};
  const postFinder = new PostFinder();
  const pots = await postFinder.findPosts(data);
  if (pots) {
    viewData.message = "Get Post Successful";
    viewData.error = false;

    viewData.pots = pots;
  }
  res.status(200).send(viewData);
}
