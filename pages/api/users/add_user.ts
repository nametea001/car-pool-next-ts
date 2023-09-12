import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { UserUpdater } from "../../../src/Domain/User/Service/UserUpdater";

async function addUser(req: NextApiRequest, res: NextApiResponse) {
  const dataParam: any = req.query;
  let viewData: any = {};

  if (req.method === "POST") {
    const data = req.body;
    const userUpdater = new UserUpdater();
    const user = await userUpdater.userInsert(data);
    if (user) {
      viewData.message = "add Users Successful";
      viewData.error = false;
      viewData.user = user;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("err add user");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}

export default addUser;
