import type { NextApiRequest, NextApiResponse } from "next";

import { PostFinder } from "../../../src/Domain/Post/Service/PostFinder";
import { JWT } from "../../../src/Auth/JWT";
import { PostDetailFinder } from "../../../src/Domain/PostDetail/Service/PostDetailFinder";
import { PostMemberFinder } from "../../../src/Domain/PostMember/Service/PostMemberFinder";

export default async function getPostDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  let postID: any = null;
  try {
    postID = Number(dataParam.post_id);
  } catch (err) {
    postID = null;
  }
  if (req.method == "GET" && tokenVerify && postID) {
    const postDetailFinder = new PostDetailFinder();
    const postDetail = await postDetailFinder.findPostDetailByPostID({
      post_id: Number(dataParam.post_id),
    });
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
  res.end();
}
