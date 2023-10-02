import type { NextApiRequest, NextApiResponse } from "next";

import { DistrictFinder } from "../../../src/Domain/District/Service/DistrictFinder";
import { JWT } from "../../../src/Auth/JWT";

export default async function getDistrictByName(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let viewData: any = {};
  const data = req.query;
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify = jwt.verifyToken(token);
  if (req.method === "GET" && tokenVerify) {
    const districtFinders = new DistrictFinder();
    const district = await districtFinders.findDistrictByName(data);
    if (district) {
      viewData.message = "Get Districts Successful";
      viewData.error = false;
      viewData.district = district;
      res.status(200).send(viewData);
      return;
    } else {
      res.status(401).send("null data");
      return;
    }
  } else {
    res.status(400).send("Bad requie");
    return;
  }
}
