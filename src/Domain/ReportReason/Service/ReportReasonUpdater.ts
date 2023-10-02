import { ReportReasonRepository } from "../Repository/ReportReasonRepository";

export class ReportReasonUpdater {
  private carRepository = new ReportReasonRepository();

  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("type" in data) {
      result.type = data.brand;
    }
    if ("reason" in data) {
      result.reason = data.reason;
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
