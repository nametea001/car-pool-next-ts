import { ReportReasonRepository } from "../Repository/ReportReasonRepository";

export class ReportReasonFinder {
  private ReportReasonRepository = new ReportReasonRepository();

  async findReportReasons(data: any) {
    return await this.ReportReasonRepository.findReportReasons(data);
  }
}
