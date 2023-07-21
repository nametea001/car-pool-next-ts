import { CarRepository } from "../Repository/CarRepository";

export class CarUpdater {
  private carRepository = new CarRepository();

  async carInsert(data: any, user_id: number) {
    const row = this.MapToRow(data, user_id, true);
    let car = await this.carRepository.carInsert(row);
    return car;
  }

  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("brand" in data) {
      result.brand = data.brand;
    }
    if ("model" in data) {
      result.model = data.model;
    }
    if ("vehicle_registration" in data) {
      result.vehicle_registration = data.vehicle_registration;
    }
    if ("color" in data) {
      result.color = data.color;
    }
    if ("user_id" in data) {
      result.user_id = data.user_id;
    }

    if (Object.keys(result).length !== 0) {
      let dataTime = new Date();
      dataTime.setHours(dataTime.getHours() + 7);
      if (create) {
        result.created_at = dataTime;
        result.created_user_id = updateBy;
      }
      result.updated_at = dataTime;
      result.updated_user_id = updateBy;
    }

    return result;
  }
}
