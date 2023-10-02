import { ReportRepository } from "../Repository/ReportRepository";

export class ReportUpdater {
  private carRepository = new ReportRepository();

  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("reason_id" in data) {
      result.reason_id = data.reason_id;
    }
    if ("user_id" in data) {
      result.user_id = data.user_id;
    }
    if ("description" in data) {
      result.description = data.description;
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
