import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as HttpServer } from "http";
import { NextApiResponseServerIO } from "../../../src/Domain/SocketIO/Type/SocketIOType";
import cors from "cors";

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
      path: "/api/socket_io",
      // addTrailingSlash: false,
    });
    // append SocketIO server to Next.js socket server response
    // res.socket.server.io = io;
    // io.on("connection", (socket) => {
    //   let userId = socket.handshake.query.user_id;
    //   console.log(userId);
    // });

    // io.on("test", (socket) => {
    //   console.log(socket);
    // });

    corsMiddleware(req, res, () => {
      res.socket.server.io = io;
    });
  } else {
    console.log("Socket is already running");
  }
  res.end();
}
