import type { NextApiRequest, NextApiResponse } from "next";

import { UserFinder } from "../../src/Domain/User/Service/UserFinder";
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
    const user = await userFinder.checkLogin(username, password);
    if (user) {
      if (dataParam.device == "mobile") {
        try {
          const filePath = path.resolve("public/profiles/", user.img_path);
          const imageBuffer = fs.readFileSync(filePath, "base64");
          user.img = imageBuffer;
        } catch (err) {
          const filePath = path.resolve("public/profiles/", "non_img.png");
          const imageBuffer = fs.readFileSync(filePath, "base64");
          user.img = imageBuffer;
        }
      }
      viewData.message = "Login Successful";
      viewData.error = false;
      viewData.user = user;
    }
  }
  res.status(200).send(viewData);
}

export default Login;
