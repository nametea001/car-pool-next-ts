import type { NextApiRequest, NextApiResponse } from "next";

import { JWT } from "../../../src/Auth/JWT";
// import { CarFinder } from "../../../src/Domain/Car/Service/CarFinder";
import { CarUpdater } from "../../../src/Domain/Car/Service/CarUpdater";

export default async function editCar(
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
    // dataBody.user_id = tokenVerify.id;
    // const carFinder = new CarFinder();
    const carUpdater = new CarUpdater();
    let dataUpdate = {
      brand: dataBody.brand,
      model: dataBody.model,
      vehicle_registration: dataBody.vehicle_registration,
      color: dataBody.color,
    };
    let whereData = { id: Number(dataBody.id) };

    let cars = await carUpdater.carUpdate(
      whereData,
      dataUpdate,
      tokenVerify.id
    );
    if (cars) {
      viewData.message = "Update Car Successful";
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
