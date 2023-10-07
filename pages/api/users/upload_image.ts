import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

import { JWT } from "../../../src/Auth/JWT";
import { UserUpdater } from "../../../src/Domain/User/Service/UserUpdater";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method === "POST" && tokenVerify) {
    try {
      await fs.readdir(path.join(process.cwd() + "/public/profiles"));
    } catch (error) {
      await fs.mkdir(path.join(process.cwd() + "/public/profiles"));
    }
    const options: formidable.Options = {};
    options.uploadDir = path.join(process.cwd(), "/public/profiles");
    options.filename = (name, ext, path, form) => {
      // return Date.now().toString() + "_" + path.originalFilename;
      let extFile = path.originalFilename!.split(".");
      return tokenVerify.id + "." + extFile[1];
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
      // return { fields, files };
      // form.parse(req);
      let file: any = files.file;
      let filename = file[0].newFilename;
      const userUpdater = new UserUpdater();
      const user = await userUpdater.userUpdateProfile(
        filename,
        tokenVerify.id
      );
      if (user) {
        viewData.message = "Upload Profile Image Successful";
        viewData.error = false;
        viewData.img_path = user.img_path;
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
