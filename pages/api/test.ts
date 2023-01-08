import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: any = req.query;
  let viewData: any = {};
  const session: any = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  viewData.s = session;
  viewData.d = parseInt(data.user_id);

  res.status(200).send(viewData);
}
