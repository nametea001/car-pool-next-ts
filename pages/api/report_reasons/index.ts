import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { ReportReasonFinder } from "../../../src/Domain/ReportReason/Service/ReportReasonFinder";

export default async function getReportReasons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam: any = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "GET" && tokenVerify) {
    const reportReasonFinder = new ReportReasonFinder();
    let reportReason = await reportReasonFinder.findReportReasons({});
    if (reportReason) {
      viewData.message = "Get Report Reason Successful";
      viewData.error = false;
      viewData.report_reasons = reportReason;
      res.status(200).send(viewData);
      return;
    } else {
      res.status(400).send("null data");
      return;
    }
  } else {
    res.status(401).send("Bad request");
    return;
  }
}
