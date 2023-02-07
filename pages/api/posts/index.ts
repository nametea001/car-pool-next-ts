import type { NextApiRequest, NextApiResponse } from "next";

import { PostFinder } from "../../../src/Domain/Post/Service/PostFinder";
import path from "path";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam: any = req.query;
  let viewData: any = {};
  if (req.method == "GET") {
    const postFinder = new PostFinder();
    const posts = await postFinder.findPosts(dataParam);
    if (posts) {
      if (dataParam.device == "mobile") {
        posts.forEach((post: any) => {
          const filePath = path.resolve(
            "public/profiles/",
            post.users.img_path
          );
          const imageBuffer = fs.readFileSync(filePath, "base64");
          post.img = imageBuffer;
        });
      }
      viewData.message = "Get Post Successful";
      viewData.error = false;
      viewData.posts = posts;
    }
  }
  res.status(200).send(viewData);
}
