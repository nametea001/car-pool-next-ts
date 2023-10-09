import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

import { JWT } from "../../../src/Auth/JWT";
import { VerifyUserUpdater } from "../../../src/Domain/VerifyUser/Service/VerifyUserUpdater";
import { VerifyUserFinder } from "../../../src/Domain/VerifyUser/Service/VerifyUserFinder";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadFile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let dataParam = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method === "POST" && tokenVerify) {
    let dirPath = "";
    let typeRoleFile: string = "";
    if (dataParam.role === "User") {
      typeRoleFile = tokenVerify.id + "_user";
      dirPath = "/public/verify_users/users/";
    } else if (dataParam.role === "Driver") {
      typeRoleFile = tokenVerify.id + "_driver";
      dirPath = "/public/verify_users/drivers/";
    } else {
      return res.status(400);
    }
    try {
      await fs.readdir(path.join(process.cwd() + dirPath));
    } catch (error) {
      await fs.mkdir(path.join(process.cwd() + dirPath));
    }
    const options: formidable.Options = {};
    options.uploadDir = path.join(process.cwd(), dirPath);
    options.filename = (name, ext, path, form) => {
      // return Date.now().toString() + "_" + path.originalFilename;
      let extFile = path.originalFilename!.split(".")[1];
      if (!["pdf"].includes(extFile)) {
        throw new Error("Invalid file extension");
      }
      return typeRoleFile + "." + extFile;
    };
    options.maxFileSize = 4000 * 1024 * 1024;
    const form = formidable(options);
    try {
      const { fields, files } = await new Promise<{
        fields: formidable.Fields;
        files: formidable.Files;
      }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });
      let file: any = files.file;
      let filename = file[0].newFilename;
      let param: any = {};
      if (dataParam.role === "User") {
        param = {
          id_card_path: filename,
          status: "NEW",
        };
      } else {
        param = {
          driver_licence_path: filename,
          status: "NEW",
        };
      }
      const verifyUserUpdater = new VerifyUserUpdater();
      const verifyUserFinder = new VerifyUserFinder();
      let verifyUser = await verifyUserFinder.findUserVerifyByUserID(
        tokenVerify.id
      );
      if (!verifyUser) {
        param.user_id = tokenVerify.id;
        let verifyUserData = await verifyUserUpdater.insertUserVerify(
          param,
          tokenVerify.id
        );
        viewData.message = "Get Verify UserData Successful";
        viewData.error = false;
        viewData.verify_user = verifyUserData;
        return res.status(200).send(viewData);
      } else if (verifyUser) {
        let verifyUserData = await verifyUserUpdater.updateUserVerifyByID(
          param,
          tokenVerify.id,
          verifyUser.id
        );
        viewData.message = "Update Verify UserData Successful";
        viewData.error = false;
        viewData.verify_user = verifyUserData;
        return res.status(200).send(viewData);
      } else {
        return res.status(400);
      }
    } catch (error) {
      // throw error;
      return res.status(500);
    }
  } else {
    return res.status(400);
  }
}
