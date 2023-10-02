import type { NextApiRequest, NextApiResponse } from "next";

import { ProvinceFinder } from "../../../src/Domain/Province/Service/ProvinceFinder";
import { JWT } from "../../../src/Auth/JWT";

export default async function getProvinces(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let viewData: any = {};
  const data = req.query;
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify = jwt.verifyToken(token);
  if (req.method == "GET" && tokenVerify) {
    const provinceFinders = new ProvinceFinder();
    const provinces = await provinceFinders.findProvinces(data);
    viewData.message = "Get Provinces Successful";
    viewData.error = false;
    viewData.provinces = provinces;
    res.status(200).send(viewData);
    return;
  } else {
    res.status(400).send("Bad requie");
    return;
  }
}
