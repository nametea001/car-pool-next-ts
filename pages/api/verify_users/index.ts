import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { VerifyUserFinder } from "../../../src/Domain/VerifyUser/Service/VerifyUserFinder";

export default async function getVerifyUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam: any = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "GET" && tokenVerify) {
    const verifyUserFinder = new VerifyUserFinder();
    let userVerify = await verifyUserFinder.findUserVerifyByUserID(
      tokenVerify.id
    );
    if (userVerify) {
      viewData.message = "Get User Verify Successful";
      viewData.error = false;
      viewData.verify_user = userVerify;
      return res.status(200).send(viewData);
    } else {
      return res.status(401).send("err null data");
    }
  } else {
    res.status(400).send("Bad request");
    return;
  }
}
