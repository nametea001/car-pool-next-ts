import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { getToken } from "next-auth/jwt";

export default async function Users(req: NextApiRequest, res: NextApiResponse) {
  const data = req.query;
  let viewData: any = {};

  try {
    if (req.method === "GET") {
      const file = "public/verify_users/" + data.path; // Replace with your image path

      // Check if the file exists
      if (!fs.existsSync(file)) {
        return res.status(404).end("File not found");
      }
      const resData = fs.readFileSync(file);
      // Set the response headers
      // res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=" + data.path);
      // Send the image as a response
      res.status(200).send(resData);
    } else {
      res.status(401).end("Unauthorized");
    }
  } catch (error) {
    console.error(error);
    res.status(500).end("Internal Server Error");
  }
}
