import type { NextApiRequest, NextApiResponse } from "next";

import { PostMemberFinder } from "../../../src/Domain/PostMember/Service/PostMemberFinder";
import { PostMemberUpdater } from "../../../src/Domain/PostMember/Service/PostMemberUpdater";

import { JWT } from "../../../src/Auth/JWT";

export default async function getPostDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam: any = req.query;
  const dataBody: any = req.body;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "POST" && tokenVerify) {
    const postMemberFinder = new PostMemberFinder();
    const postMemberUpdater = new PostMemberUpdater();
    let whereData = { post_id: Number(dataBody.post_id) };
    let getPostMemberForcheckJoin =
      await postMemberFinder.findPostMemberForCheckJoin(whereData);

    if (getPostMemberForcheckJoin.length !== 0) {
      let countMember = 0;
      let isMember = false;
      let seat = getPostMemberForcheckJoin[0].posts.post_details.seat;
      getPostMemberForcheckJoin.forEach((e: any) => {
        countMember++;
        if (Number(dataBody.user_id) === e.user_id) {
          isMember = true;
        }
      });

      if (!isMember && countMember < seat) {
        let dataInsert = {
          post_id: dataBody.post_id,
          user_id: tokenVerify.id,
        };
        let postMember = await postMemberUpdater.postMemberInsert(dataInsert);
        viewData.message = "Insert Post Member Successful";
        viewData.error = false;
        viewData.post_members = postMember;
        res.status(200).send(viewData);
      } else {
        viewData.message = "Insert Post Member Fail";
        viewData.error = true;
        viewData.post_members = {};
        res.status(200).send(viewData);
      }
    } else if (getPostMemberForcheckJoin.length === 0) {
      let dataInsert = {
        post_id: dataBody.post_id,
        user_id: tokenVerify.id,
      };
      let postMember = await postMemberUpdater.postMemberInsert(dataInsert);
      viewData.message = "Insert Post Member Successful";
      viewData.error = false;
      viewData.post_members = postMember;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("Null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
  res.end();
}
