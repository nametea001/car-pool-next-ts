import type { NextApiRequest, NextApiResponse } from "next";

import { JWT as jwt } from "../../src/Auth/JWT";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: any = req.query;
  let viewData: any = {};
  const headers = req.headers;
  viewData.data = headers;
  viewData.token = headers["auth-token"];
  res.status(200).send(viewData);
}
