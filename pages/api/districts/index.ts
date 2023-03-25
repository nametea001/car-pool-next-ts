import type { NextApiRequest, NextApiResponse } from "next";

import { DistrictFinder } from "../../../src/Domain/District/Service/DistrictFinder";

export default async function Aumphure(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let viewData: any = {};
  const data = req.query;
  if (req.method === "GET") {
    const aumphureFinders = new DistrictFinder();
    const aumphures = await aumphureFinders.findDistricts(data);
    viewData.message = "Get Districts Successful";
    viewData.error = false;
    viewData.aumphures = aumphures;
  }

  res.status(200).send(viewData);
}
