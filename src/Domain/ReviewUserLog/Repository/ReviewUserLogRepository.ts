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

  async findReviewUserLogs(userID: number) {
    let reviewUserLog: any = null;
    try {
      reviewUserLog = this.prisma.review_user_logs.findMany({
        orderBy: { created_at: "desc" },
        where: { user_id: userID },
        select: {
          id: true,
          post_id: true,
          user_id: true,
          posts: {
            select: {
              id: true,
              name_start: true,
              name_end: true,
              start_district_id: true,
              end_district_id: true,
              date_time_start: true,
              date_time_back: true,
              created_user_id: true,
              status: true,
              post_details: {
                select: {
                  seat: true,
                  price: true,
                },
              },
              users: {
                select: {
                  img_path: true,
                  first_name: true,
                  last_name: true,
                  email: true,
                  sex: true,
                },
              },
              _count: {
                select: {
                  post_members: true,
                },
              },
            },
          },
        },
      });
    } catch (err) {
      reviewUserLog = null;
    }
    this.prisma.$disconnect();
    return reviewUserLog;
  }
}