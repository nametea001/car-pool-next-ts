import type { NextApiRequest, NextApiResponse } from "next";

import { ThaiAumphureFinder } from "../../../src/Domain/ThaiAumphure/Service/ThaiAumphureFinder";

export default async function Aumphure(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let viewData: any = {};
  const data = req.query;
  if (req.method === "GET") {
    const aumphureFinders = new ThaiAumphureFinder();
    const aumphures = await aumphureFinders.findAumphures(data);
    viewData.message = "Get Aumphures Successful";
    viewData.error = false;
    viewData.aumphures = aumphures;
  }

  res.status(200).send(viewData);
}
