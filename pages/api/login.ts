import type { NextApiRequest, NextApiResponse } from "next";

import { UserFinder } from "../../src/Domain/User/Service/UserFinder";

async function Login(req: NextApiRequest, res: NextApiResponse) {
  let viewData: any = {};
  
  // const data = req.query;
  let username = (req.body.username ?? "").toString();
  let password = (req.body.password ?? "").toString();
  if (req.method === "POST" && (username !== "" || password !== "")) {
    const userFinder = new UserFinder();
    const user = await userFinder.checkLogin(username, password);
    if (user) {
      viewData.message = "Login Successful";
      viewData.error = false;
      viewData.user = user;
    }
  }
  res.status(200).send(viewData);
}

export default Login;
