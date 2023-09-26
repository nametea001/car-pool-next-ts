import { PrismaClient } from "@prisma/client";
export class ChatUserLogRepository {
  private prisma = new PrismaClient();

  async insertChatUserLog(data: any) {
    let res: any = null;
    try {
      res = await this.prisma.chat_user_logs.create({
        data: data,
        select: { id: true },
      });
    } catch (err) {
      res = null;
    }
    this.prisma.$disconnect();
    return res;
  }

  async insertManyChatUserLog(data: any) {
    let res: any = null;
    try {
      res = await this.prisma.chat_user_logs.createMany({
        data: data,
      });
    } catch (err) {
      res = null;
    }
    this.prisma.$disconnect();
    return res;
  }

  async DeleteByChatIDAndUserID(data: any) {
    let res: any = null;
    try {
      res = await this.prisma.chat_user_logs.deleteMany({
        where: { AND: [{ user_id: data.user_id }, { chat_id: data.chat_id }] },
      });
    } catch (err) {
      res = null;
    }
    this.prisma.$disconnect();
    return res;
  }

  async getChatUserLogAndChatByUserUserID(userID: number) {
    let res: any = null;
    try {
      let groupByForID = await this.prisma.chat_user_logs.groupBy({
        by: ["chat_id"],
        where: { user_id: userID },
        _max: { id: true },
      });
      let whereData: any[] = groupByForID.map((data) => {
        return { id: data._max.id };
      });
      res = await this.prisma.chat_user_logs.findMany({
        orderBy: {
          chats: { updated_at: "desc" },
        },
        where: { OR: whereData },
        select: {
          id: true,
          user_id: true,
          chats: {
            select: {
              id: true,
              chat_type: true,
              send_user_id: true,
              send_post_id: true,
              created_user_id: true,
              send_user: {
                select: { first_name: true, last_name: true, img_path: true },
              },
              created_user: {
                select: { first_name: true, last_name: true, img_path: true },
              },
              posts: {
                select: { name_end: true },
              },
              chat_details: {
                select: { msg_type: true, msg: true, created_user_id: true },
                orderBy: { id: "desc" },
                take: 1,
              },
              _count: {
                select: { chat_user_logs: { where: { user_id: userID } } },
              },
              created_at: true,
            },
          },
        },
      });
    } catch (err) {
      res = null;
    }
    this.prisma.$disconnect();
    return res;
  }

  async countChatUserLogsByUserID(userID: number) {
    let chatUserLogs: any = null;
    try {
      chatUserLogs = await this.prisma.chat_user_logs.aggregate({
        where: { user_id: userID },
        _count: true,
      });
    } catch (err) {
      chatUserLogs = null;
    }
    this.prisma.$disconnect();
    return chatUserLogs;
  }
}
