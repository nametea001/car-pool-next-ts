import type { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIO } from "../../../src/Domain/SocketIO/Type/SocketIOType";
import { JWT } from "../../../src/Auth/JWT";
import { VerifyUserUpdater } from "../../../src/Domain/VerifyUser/Service/VerifyUserUpdater";
import { UserUpdater } from "../../../src/Domain/User/Service/UserUpdater";
import { getToken } from "next-auth/jwt";

export default async function updateVerify(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  const dataParam: any = req.query;
  const dataBody: any = req.body;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  let tokenVerify: any = jwt.verifyToken(token);
  try {
    if (!tokenVerify) {
      let temp: any = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      tokenVerify = temp.user;
    }
  } catch (err) {
    tokenVerify = null;
  }

  if (req.method == "PUT" && tokenVerify) {
    const verifyUserUpdater = new VerifyUserUpdater();
    let userVerify = await verifyUserUpdater.updateUserVerifyByID(
      dataBody,
      tokenVerify.id,
      dataBody.id
    );
    if (userVerify) {
      const userUpdater = new UserUpdater();
      let user = await userUpdater.userEdit(
        { user_role_id: dataBody.user_role_id },
        userVerify.created_user_id,
        tokenVerify.id
      );
      userVerify.users = user;
      viewData.message = "Update User Verify Successful";
      viewData.error = false;
      viewData.verify_user = userVerify;
      res?.socket?.server?.io?.emit(
        "user_" + userVerify.created_user_id,
        "Update_User"
      );
      return res.status(200).send(viewData);
    } else {
      return res.status(401).send("err null data");
    }
  } else {
    res.status(400).send("Bad request");
    return;
  }
}
