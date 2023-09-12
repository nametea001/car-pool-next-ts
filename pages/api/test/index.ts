import { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIO } from "../../../src/Domain/SocketIO/Type/SocketIOType";
// import { JWT } from "../../../src/Auth/JWT";

export default async function Chat(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  // const jwt = new JWT();
  // const token = req.headers["auth-token"];
  // const tokenVerify = jwt.verifyToken(token);

  if (req.method === "GET") {
    // get message
    const data = req.query;
    // console.log("test");
    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("test", data.id);
    // res?.socket?.server?.io?.emit("user_1", message);
    // res?.socket?.server?.io?.on();

    // return message
    res.status(200).send("good");
  } else {
    res.status(401).send("bad");
  }

  res.end();
}
