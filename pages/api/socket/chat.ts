import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as HttpServer } from "http";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";

import { JWT } from "../../../src/Auth/JWT";

type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

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
