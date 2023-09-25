import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { ReviewFinder } from "../../../src/Domain/Review/Service/ReviewFinder";
import { ReviewUpdater } from "../../../src/Domain/Review/Service/ReviewUpdater";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const dataParam: any = req.query;
  const dataBody: any = req.body;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "PUT" && tokenVerify) {
    const reviewUpdater = new ReviewUpdater();
    let review = await reviewUpdater.editReview(
      dataBody.review_id,
      dataBody,
      tokenVerify.id
    );
    if (review) {
      viewData.message = "Get My Review Successful";
      viewData.error = false;
      viewData.review = review;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("err null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
