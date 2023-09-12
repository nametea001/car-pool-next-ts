import type { NextApiRequest, NextApiResponse } from "next";

import { UserFinder } from "../../src/Domain/User/Service/UserFinder";
import { JWT } from "../../src/Auth/JWT";
import path from "path";
import fs from "fs";

async function Login(req: NextApiRequest, res: NextApiResponse) {
  let viewData: any = {};
  const dataParam: any = req.query;
  const dataBody: any = req.body;
  // const data = req.query;
  let username = (dataBody.username ?? "").toString();
  let password = (dataBody.password ?? "").toString();

  if (req.method === "POST" && (username !== "" || password !== "")) {
    const userFinder = new UserFinder();
    const jwt = new JWT();
    const user = await userFinder.checkLogin(username, password);
    const token = jwt.createToken(user);
    if (user && token) {
      viewData.message = "Login Successful";
      viewData.error = false;
      viewData.token = token;
      viewData.user = user;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("error login");
    }
  } else {
    res.status(400).send("error login");
  }
  res.end();
}

export default Login;
