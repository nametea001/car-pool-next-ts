import { PrismaClient } from "@prisma/client";

export class ReviewUserLogRepository {
  private prisma = new PrismaClient();

  async insertManyReviewUserLog(data: any) {
    let res: any = null;
    try {
      res = await this.prisma.chat_user_logs.createMany({
        data: data,
      });
    } catch (err) {
      console.log(err);
      res = null;
    }
    return res;
  }

  async findReviewUserLogs(data: any) {
    let reviewUserLog: any = null;
    try {
    } catch (err) {
      reviewUserLog = null;
    }
    this.prisma.$disconnect();
    return reviewUserLog;
  }
}
