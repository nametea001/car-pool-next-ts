import type { NextApiRequest, NextApiResponse } from "next";

import path from "path";
import fs from "fs";

import { JWT } from "../../../src/Auth/JWT";
import { ReviewFinder } from "../../../src/Domain/Review/Service/ReviewFinder";

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
    const reviewFinder = new ReviewFinder();
    let reviews = await reviewFinder.findReviews(dataParam);
    if (reviews) {
      reviews.forEach((review: any) => {
        const filePath = path.resolve(
          "public/profiles/",
          review.users_reviews_created.img_path
        );
        try {
          const imageBuffer = fs.readFileSync(filePath, "base64");
          review.img = imageBuffer;
        } catch (err) {
          const filePath = path.resolve("public/profiles/", "non_img.png");
          const imageBuffer = fs.readFileSync(filePath, "base64");
          review.img = imageBuffer;
        }
      });
    } else {
      res.status(401).send("err null data");
    }
    res.status(200).send(viewData);
  } else {
    res.status(400).send("Bad request");
  }
}
