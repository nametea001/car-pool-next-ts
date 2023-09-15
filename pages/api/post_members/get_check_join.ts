import type { NextApiRequest, NextApiResponse } from "next";
import { PostMemberFinder } from "../../../src/Domain/PostMember/Service/PostMemberFinder";
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
  const tokenVerify = jwt.verifyToken(token);
  let whereData = null;
  try {
    whereData = { post_id: Number(dataParam.post_id) };
  } catch (err) {
    whereData = null;
  }
  if (req.method == "GET" && tokenVerify && whereData) {
    const postFinder = new PostMemberFinder();
    const postMember = await postFinder.findPostMemberForCheckJoin(whereData);
    if (postMember) {
      viewData.message = "Get Post Member Successful";
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
