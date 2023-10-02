import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
// import { CarFinder } from "../../../src/Domain/Car/Service/CarFinder";
import { CarUpdater } from "../../../src/Domain/Car/Service/CarUpdater";

export default async function addCar(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataParam: any = req.query;
  const dataBody = req.body;
  let viewData: any = {};
  const jwt = new JWT();
  const token = req.headers["auth-token"];
  const tokenVerify: any = jwt.verifyToken(token);
  if (req.method == "POST" && tokenVerify) {
    dataBody.user_id = tokenVerify.id;
    // const carFinder = new CarFinder();
    const carUpdater = new CarUpdater();
    let cars = await carUpdater.carInsert(dataBody, tokenVerify.id);
    if (cars) {
      viewData.message = "Add Car Successful";
      viewData.error = false;
      viewData.car = cars;
      res.status(200).send(viewData);
      return;
    } else {
      res.status(401).send("null data");
      return;
    }
  } else {
    res.status(400).send("Bad request");
    return;
  }
}
