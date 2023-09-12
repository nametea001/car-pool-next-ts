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
      let avgRatingReview = await reviewFinder.avgReviews(
        parseInt(dataParam.user_id)
      );
      viewData.message = "Get Reveiw Successful";
      viewData.error = false;
      viewData.reviews = reviews;
      viewData.avg_review = avgRatingReview;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("err null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
