import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { UserUpdater } from "../../../src/Domain/User/Service/UserUpdater";

async function editUser(req: NextApiRequest, res: NextApiResponse) {
  const dataQuery: any = req.query;
  let viewData: any = {};
  var updateById: number = 0;

  const session: any = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (session) {
    updateById = parseInt(session.user?.id) ?? 0;
  } else if (parseInt(dataQuery.user_id)) {
    updateById = parseInt(dataQuery.user_id);
  }
  if (req.method === "POST" && updateById !== 0) {
    const data = req.body;
    const userUpdater = new UserUpdater();
    const userId = parseInt(data.id);
    const user = await userUpdater.userEdit(data, userId, updateById);
    if (user) {
      viewData.message = "Update Users Successful";
      viewData.error = false;
      viewData.users = user;
    }
  }
  // res.status(200).json({ name: "John Doe" });
  res.status(200).send(viewData);
}

export default editUser;
