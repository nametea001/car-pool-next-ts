import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { ReportUpdater } from "../../../src/Domain/Report/Service/ReportUpdater";

export default async function addReport(
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
    const reportUpdater = new ReportUpdater();
    let resData = await reportUpdater.addReport(dataBody, tokenVerify.id);
    if (resData) {
      viewData.message = "Add Report Successful";
      viewData.error = false;
      viewData.report = resData;
      res.status(200).send(viewData);
      return;
    } else {
      res.status(401).send("Null data");
      return;
    }
  } else {
    res.status(400).send("Bad request");
    return;
  }
}
