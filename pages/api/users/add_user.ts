import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { UserUpdater } from "../../../src/Domain/User/Service/UserUpdater";

async function editUser(req: NextApiRequest, res: NextApiResponse) {
  const dataParam: any = req.query;
  let viewData: any = {};

  if (req.method === "POST") {
    const data = req.body;
    const userUpdater = new UserUpdater();
    // const user = await userUpdater.userEdit(data, userId, updateById);
    // if (user) {
    //   viewData.message = "add Users Successful";
    //   viewData.error = false;
    // //   viewData.users = user;
    // }
    viewData.test = data;
  }
  res.status(200).send(viewData);
}

export default editUser;
