import { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIO } from "../../../src/Domain/SocketIO/Type/SocketIOType";
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
    // res?.socket?.server?.io?.emit("message", message);
    // res?.socket?.server?.io?.on();

    // return message
    res.status(201).json(message);
  }

  res.end();
}
