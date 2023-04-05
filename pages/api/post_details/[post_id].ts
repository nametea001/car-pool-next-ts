import type { NextApiRequest, NextApiResponse } from "next";

import { PostFinder } from "../../../src/Domain/Post/Service/PostFinder";
import { JWT } from "../../../src/Auth/JWT";
import { PostDetailFinder } from "../../../src/Domain/PostDetail/Service/PostDetailFinder";

export default async function getPostDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { post_id } = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify = jwt.verifyToken(token);
  let postID: any = null;
  try {
    postID = { post_id: Number(post_id) };
  } catch (err) {
    postID = null;
    console.log(err);
  }
  if (req.method == "GET" && tokenVerify && postID) {
    const postDetailFinder = new PostDetailFinder();
    const postDetail = await postDetailFinder.findPostDetailByPostID(postID);
    if (postDetail) {
      viewData.message = "Get PostDetail Successful";
      viewData.error = false;
      viewData.post_detail = postDetail;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("Null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
}
