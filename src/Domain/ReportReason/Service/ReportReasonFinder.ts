import { ReportReasonRepository } from "../Repository/ReportReasonRepository";

export class ReportReasonFinder {
  private ReportReasonRepository = new ReportReasonRepository();

  async findReportReasons(data: any) {
    const reportReasons = await this.ReportReasonRepository.findReportReasons(data);
    return reportReasons;
  }
}
