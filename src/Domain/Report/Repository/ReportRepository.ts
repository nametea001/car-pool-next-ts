import { PrismaClient } from "@prisma/client";
export class ReportRepository {
  private prisma = new PrismaClient();

  async findReports(data: any) {
    //  praram controll
    let report: any = null;
    try {
      report = await this.prisma.reports.findMany({
        select: {
          id: true,
          reason_id: true,
          user_id: true,
        },
      });
    } catch (err) {
      report = null;
    }
    this.prisma.$disconnect();
    return report;
  }

  async addReport(data: any) {
    let report: any = null;
    try {
      report = await this.prisma.reports.create({ data, select: { id: true } });
    } catch (err) {
      report = null;
    }
    this.prisma.$disconnect();
    return report;
  }
}
