import type { NextApiRequest, NextApiResponse } from "next";

import { PostFinder } from "../../../src/Domain/Post/Service/PostFinder";
import { PostUpdater } from "../../../src/Domain/Post/Service/PostUpdater";
import { JWT } from "../../../src/Auth/JWT";

export default async function addPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam: any = req.query;
  const dataBody: any = req.body;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "POST" && tokenVerify) {
    const postUpdater = new PostUpdater();

    const userID = tokenVerify.id;
    const posts = await postUpdater.addPostAndPostDetail(dataBody, userID);
    if (posts) {
      viewData.message = "Insert Post and PostDetail Successful";
      viewData.error = false;
      viewData.post = posts;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("Null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
}
