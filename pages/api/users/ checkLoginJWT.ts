import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import path from "path";
import fs from "fs";

async function Login(req: NextApiRequest, res: NextApiResponse) {
  let viewData: any = {};
  const dataParam: any = req.query;
  const dataBody: any = req.body;
  // const data = req.query;

  if (req.method === "POST") {
    const jwt = new JWT();
    const token = req.headers["auth-token"];
    let user: any = jwt.verifyToken(token);
    if (user && token) {
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
      viewData.message = "LoginJWT Successful";
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
