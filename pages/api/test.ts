import type { NextApiRequest, NextApiResponse } from "next";

import { PostFinder } from "../../src/Domain/Post/Service/PostFinder";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: any = req.query;
  let viewData: any = {};
  const postFinder = new PostFinder();
  const posts = await postFinder.findPosts(data);
  viewData.message = "Get Provinces Successful";
  viewData.error = false;
  viewData.posts = posts;
  res.status(200).send(viewData);
}
