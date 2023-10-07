import type { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "../../../src/Auth/JWT";
import { UserUpdater } from "../../../src/Domain/User/Service/UserUpdater";

export default async function editProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let viewData: any = {};
  const data = req.body;
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method === "PUT" && tokenVerify) {
    const userUpdater = new UserUpdater();
    const user = await userUpdater.userEdit(
      data,
      tokenVerify.id,
      tokenVerify.id
    );
    if (user) {
      viewData.message = "Update Users Successful";
      viewData.error = false;
      viewData.user = user;
      viewData.token = jwt.createToken(user);
      return res.status(200).send(viewData);
    } else {
      return res.status(400);
    }
  } else {
    return res.status(401);
  }
}
