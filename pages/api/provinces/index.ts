import type { NextApiRequest, NextApiResponse } from "next";

import { ThaiProvenceFinder } from "../../../src/Domain/ThaiProvence/Service/ThaiProvenceFinder";

export default async function Provinces(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let viewData: any = {};
  const data = req.query;
  if (req.method === "GET") {
    const provenceFinders = new ThaiProvenceFinder();
    const provences = await provenceFinders.findThaiProvences(data);
    viewData.message = "Get Provences Successful";
    viewData.error = false;
    viewData.provences = provences;
  }

  res.status(200).send(viewData);
}
