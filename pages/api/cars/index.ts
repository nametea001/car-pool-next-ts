import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
import { CarFinder } from "../../../src/Domain/Car/Service/CarFinder";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam: any = req.query;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "GET" && tokenVerify) {
    const carFinder = new CarFinder();
    let cars = await carFinder.findCars({
      user_id: tokenVerify.id,
    });
    if (cars) {
      viewData.message = "Get Car Successful";
      viewData.error = false;
      viewData.cars = cars;
      res.status(200).send(viewData);
    } else {
      res.status(401).send("null data");
    }
  } else {
    res.status(400).send("Bad request");
  }
}
