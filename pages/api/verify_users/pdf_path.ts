import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { getToken } from "next-auth/jwt";

export default async function Users(req: NextApiRequest, res: NextApiResponse) {
  const data = req.query;
  let viewData: any = {};

  try {
    // const session: any = await getToken({
    //   req: req,
    //   secret: process.env.NEXTAUTH_SECRET,
    // });

    if (req.method === "GET") {
      // Check if the user is authorized (user role ID <= 2)
      // If authorized, send an image file as response
      const imagePath = "public/profiles/test1.jpg"; // Replace with your image path

      // Check if the file exists
      if (!fs.existsSync(imagePath)) {
        return res.status(404).end("Image not found");
      }

      // Read the image file
      const resData = fs.readFileSync(imagePath);

      // Set the response headers
      // res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "inline; filename=your-document.pdf"
      );
      // Send the image as a response
      res.send(resData);
    } else {
      res.status(401).end("Unauthorized");
    }
  } catch (error) {
    console.error(error);
    res.status(500).end("Internal Server Error");
  }
}
