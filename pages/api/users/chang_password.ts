import type { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "../../../src/Auth/JWT";
import { UserUpdater } from "../../../src/Domain/User/Service/UserUpdater";

export default async function changePassoword(
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
    const user = await userUpdater.changePassword(data, tokenVerify.id);
    if (user) {
      viewData.message = "Change Password Users Successful";
      viewData.error = false;
      return res.status(200).send(viewData);
    } else {
      return res.status(400);
    }
  } else {
    return res.status(401);
  }
}
