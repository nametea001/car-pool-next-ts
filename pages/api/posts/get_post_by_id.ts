import type { NextApiRequest, NextApiResponse } from "next";

import { PostFinder } from "../../../src/Domain/Post/Service/PostFinder";
import { JWT } from "../../../src/Auth/JWT";

import path from "path";
import fs from "fs";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam: any = req.query;
  let postID: any = null;
  try {
    postID = Number(dataParam.post_id);
  } catch (err) {
    postID = null;
  }
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify = jwt.verifyToken(token);
  if (req.method == "GET" && tokenVerify && postID) {
    const postFinder = new PostFinder();
    const posts = await postFinder.findPostByPostID(postID);
    if (posts) {
      viewData.message = "Get Post Successful";
      viewData.error = false;
      viewData.posts = posts;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("Null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
