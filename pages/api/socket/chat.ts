import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../types/next";

import { JWT } from "../../../src/Auth/JWT";

export default function chat(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify = jwt.verifyToken(token);

  if (req.method === "POST" && tokenVerify) {
    // get message
    const message = req.body;

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("message", message);

    // return message
    res.status(201).json(message);
  }

  res.end();
}
