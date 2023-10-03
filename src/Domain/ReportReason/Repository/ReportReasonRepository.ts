import { PrismaClient } from "@prisma/client";
export class ReportReasonRepository {
  private prisma = new PrismaClient();

  async findReportReasons(data: any) {
    let reportReason: any = null;
    try {
      reportReason = await this.prisma.report_reasons.findMany({
        orderBy: { created_at: "desc" },
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
