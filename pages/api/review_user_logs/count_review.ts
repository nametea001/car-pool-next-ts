import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { ReviewUserLogFinder } from "../../../src/Domain/ReviewUserLog/Service/ReviewUserLogFinder";

export default async function countReview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const dataParam: any = req.query;
  // const dataBody: any = req.body;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "GET" && tokenVerify) {
    const reviewUserLogFinder = new ReviewUserLogFinder();
    let reviewUserlog = await reviewUserLogFinder.countReviewUserLogs(
      tokenVerify.id
    );
    if (reviewUserlog) {
      viewData.message = "Get Review User Log Successful";
      viewData.error = false;
      viewData.review_user_log = reviewUserlog;
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
