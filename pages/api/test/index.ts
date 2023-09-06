import type { NextApiRequest, NextApiResponse } from "next";

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  let dataParam = req.query;

  let xx: { a: string; b: [any] } = { a: "ss", b: [null] };

  console.log("sss " + Number(dataParam.id));
  xx.b.push(dataParam.id);

  res.status(200).send(xx);
}
