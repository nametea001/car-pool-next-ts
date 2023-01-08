import type { NextApiRequest, NextApiResponse } from "next";

import { UserFinder } from "../../../src/Domain/User/Service/UserFinder";

export default async function Users(req: NextApiRequest, res: NextApiResponse) {
  const data = req.query;
  let viewData: any = {};
  if (req.method === "GET") {
    const userFinder = new UserFinder();
    let users = await userFinder.findUsers(data);
    if (users) {
      viewData.message = "Get Users Successful";
      viewData.error = false;
      viewData.users = users;
    }
  }

  res.status(200).send(viewData);
}
