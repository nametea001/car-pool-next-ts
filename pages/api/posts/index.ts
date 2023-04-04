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
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify = jwt.verifyToken(token);
  if (req.method == "GET" && tokenVerify) {
    const postFinder = new PostFinder();
    const posts = await postFinder.findPosts(dataParam);
    if (posts) {
      if (dataParam.device == "mobile") {
        posts.forEach((post: any) => {
          const filePath = path.resolve(
            "public/profiles/",
            post.users.img_path
          );
          try {
            const imageBuffer = fs.readFileSync(filePath, "base64");
            post.img = imageBuffer;
          } catch (err) {
            const filePath = path.resolve("public/profiles/", "non_img.png");
            const imageBuffer = fs.readFileSync(filePath, "base64");
            post.img = imageBuffer;
          }
        });
      }
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
}
