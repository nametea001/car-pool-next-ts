import type { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIO } from "../../../src/Domain/SocketIO/Type/SocketIOType";

import { PostFinder } from "../../../src/Domain/Post/Service/PostFinder";
import { PostUpdater } from "../../../src/Domain/Post/Service/PostUpdater";
import { JWT } from "../../../src/Auth/JWT";

export default async function addPost(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  const dataParam: any = req.query;
  const dataBody: any = req.body;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "POST" && tokenVerify) {
    const postFinder = new PostFinder();
    const postUpdater = new PostUpdater();
    let dataCheckStatus: any = await postFinder.findStatusPostByID(
      Number(dataBody.post_id)
    );
    if (
      (dataCheckStatus.status === "IN_PROGRESS" &&
        dataBody.status === "DONE") ||
      (dataCheckStatus.status !== "DONE" &&
        dataCheckStatus.status !== "CANCEL" &&
        dataBody.status === "CANCEL")
    ) {
      let post = await postUpdater.updatePosts(
        { id: Number(dataBody.post_id) },
        dataBody,
        tokenVerify.id
      );
      if (post) {
        res?.socket?.server?.io?.emit("server_post", post.id);
        viewData.message = "Update Post Successful";
        viewData.error = false;
        viewData.post = post;
        res.status(200).send(viewData);
      } else {
        res.status(401).send("Status err");
      }
    } else {
      res.status(401).send("Null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
