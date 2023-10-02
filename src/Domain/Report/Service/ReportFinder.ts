import { ReportRepository } from "../Repository/ReportRepository";

export class ReportFinder {
  private ReportRepository = new ReportRepository();

  async findReports(data: any) {
    const reports = await this.ReportRepository.findReports(data);
    return reports;
  }
}
