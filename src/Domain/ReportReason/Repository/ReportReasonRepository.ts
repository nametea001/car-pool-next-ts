import { PrismaClient } from "@prisma/client";
export class ReportReasonRepository {
  private prisma = new PrismaClient();

  async findReportReasons(data: any) {
    //  praram controll
    let reportReason: any = null;
    try {
      reportReason = await this.prisma.report_reasons.findMany({
        select: {
          id: true,
          type: true,
          reason: true,
        },
      });
    } catch (err) {
      reportReason = null;
    }
    this.prisma.$disconnect();
    return reportReason;
  }
}
