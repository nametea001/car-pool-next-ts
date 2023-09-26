import type { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "../../../src/Auth/JWT";
import { ReviewFinder } from "../../../src/Domain/Review/Service/ReviewFinder";
import { ReviewUserLogFinder } from "../../../src/Domain/ReviewUserLog/Service/ReviewUserLogFinder";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam: any = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "GET" && tokenVerify) {
    const reviewFinder = new ReviewFinder();
    const reviewUserLogFinder = new ReviewUserLogFinder();
    let reviews = await reviewFinder.findMyReviews(tokenVerify.id);
    let reviewUserLogs = await reviewUserLogFinder.findReviewUserLogs(
      tokenVerify.id
    );
    if (reviews || reviewUserLogs) {
      viewData.message = "Edit My Review Successful";
      viewData.error = false;
      viewData.reviews = reviews;
      viewData.review_user_logs = reviewUserLogs;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("err null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
