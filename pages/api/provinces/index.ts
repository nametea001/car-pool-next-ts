import type { NextApiRequest, NextApiResponse } from "next";

import { ThaiProvinceFinder } from "../../../src/Domain/Province/Service/ProvinceFinder";

export default async function Provinces(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let viewData: any = {};
  const data = req.query;
  if (req.method === "GET") {
    const provinceFinders = new ThaiProvinceFinder();
    const provinces = await provinceFinders.findThaiProvinces(data);
    viewData.message = "Get Provinces Successful";
    viewData.error = false;
    viewData.provinces = provinces;
  }

  res.status(200).send(viewData);
}
