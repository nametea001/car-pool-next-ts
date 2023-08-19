import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as HttpServer } from "http";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

import { JWT } from "../../../src/Auth/JWT";

type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export default async function socketIO(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  const corsMiddleware = cors();

  if (!res.socket.server.io) {
    console.log("Enable Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer: HttpServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      // path: "/api/socket/socket_io",
      // addTrailingSlash: false,
    });
    // append SocketIO server to Next.js socket server response
    // res.socket.server.io = io;

    corsMiddleware(req, res, () => {
      res.socket.server.io = io;
      res.end();
    });
  } else {
    console.log("Socket is already running");
    res.end();
  }
}
