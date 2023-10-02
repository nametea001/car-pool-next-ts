import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { ReviewUpdater } from "../../../src/Domain/Review/Service/ReviewUpdater";
import { ReviewUserLogUpdater } from "../../../src/Domain/ReviewUserLog/Service/ReviewUserLogUpdater";

export default async function addReview(
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
    const reviewUpdater = new ReviewUpdater();
    const reviewUserLogUpdater = new ReviewUserLogUpdater();
    let review = await reviewUpdater.addReview(dataBody, tokenVerify.id);
    if (review) {
      await reviewUserLogUpdater.deleteReviewUserLog(
        Number(dataParam.review_user_log_id)
      );
      viewData.message = "Add Review Successful";
      viewData.error = false;
      viewData.review = review;
      res.status(200).send(viewData);
      return;
    } else {
      res.status(401).send("err null data");
      return;
    }
  } else {
    res.status(400).send("Bad request");
    return;
  }
}
