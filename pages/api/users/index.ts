import type { NextApiRequest, NextApiResponse } from "next";

import { UserFinder } from "../../../src/Domain/User/Service/UserFinder";
import { getToken } from "next-auth/jwt";

export default async function Users(req: NextApiRequest, res: NextApiResponse) {
  const data = req.query;
  let viewData: any = {};

  try {
    const session: any = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (req.method === "GET" && session.user.user_role_id == 1) {
      const userFinder = new UserFinder();
      let users = await userFinder.findUsers(data);
      if (users) {
        viewData.message = "Get Users Successful";
        viewData.error = false;
        viewData.users = users;
      }
    }
  } catch (error) {
    viewData.error = true;
  }

  res.status(200).send(viewData);
  res.end();
}
