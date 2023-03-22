import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { UserUpdater } from "../../../src/Domain/User/Service/UserUpdater";

async function editUser(req: NextApiRequest, res: NextApiResponse) {
  const dataParam: any = req.query;
  let viewData: any = {};

  if (req.method === "POST" && dataParam.device == "mobile") {
    const data = req.body;
    const userUpdater = new UserUpdater();
    const user = await userUpdater.userInsert(data);
    // if (user) {
    //   viewData.message = "add Users Successful";
    //   viewData.error = false;
    // //   viewData.users = user;
    // }
    viewData.user = data;
  }
  res.status(200).send(viewData);
}

export default editUser;
