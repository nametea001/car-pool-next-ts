import { PostDetailRepository } from "../Repository/PostDetailRepository";

export class PostDetailUpdater {
  private districtReposotory = new PostDetailRepository();

  // map to DB
  MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("post_id" in data) {
      result.post_id = data.post_id;
    }
    if ("lat_lng_start" in data) {
      result.lat_lng_start = data.lat_lng_start;
    }
    if ("lat_lng_end" in data) {
      result.lat_lng_end = data.lat_lng_end;
    }
    if ("seat" in data) {
      result.seat = data.seat;
    }
    if ("price" in data) {
      result.price = data.price;
    }
    if ("description" in data) {
      result.description = data.description;
    }
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
