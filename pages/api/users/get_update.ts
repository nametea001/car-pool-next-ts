import type { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "../../../src/Auth/JWT";
import { UserFinder } from "../../../src/Domain/User/Service/UserFinder";

export default async function getUpdateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let viewData: any = {};
  const data = req.body;
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method === "GET" && tokenVerify) {
    const userFinder = new UserFinder();
    const user = await userFinder.getUpdateByID(tokenVerify.id);
    if (user) {
      let createdToken = jwt.createToken(user);
      viewData.message = "Update Users Successful";
      viewData.error = false;
      viewData.user = user;
      viewData.token = createdToken;
      return res.status(200).send(viewData);
    } else {
      return res.status(400);
    }
  } else {
    return res.status(401);
  }
}
