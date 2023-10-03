import { ReportRepository } from "../Repository/ReportRepository";

export class ReportUpdater {
  private reportRepository = new ReportRepository();

  async addReport(data: any, userID: number) {
    const row = this.MapToRow(data, userID, true);
    return await this.reportRepository.addReport(row);
  }
  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("reason_id" in data) {
      result.reason_id = data.reason_id;
    }
    if ("user_id" in data) {
      result.user_id = data.user_id;
    }
    if ("post_id" in data) {
      result.post_id = data.post_id;
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
