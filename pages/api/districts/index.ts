import type { NextApiRequest, NextApiResponse } from "next";

import { DistrictFinder } from "../../../src/Domain/District/Service/DistrictFinder";
import { JWT } from "../../../src/Auth/JWT";

export default async function getDistrict(
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
    const districts = await districtFinders.findDistricts(data);
    viewData.message = "Get Districts Successful";
    viewData.error = false;
    viewData.districts = districts;
    res.status(200).send(viewData);
  } else {
    res.status(400).send("Bad requie");
  }
  res.end();
}
