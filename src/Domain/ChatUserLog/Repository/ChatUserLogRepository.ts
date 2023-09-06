import { PrismaClient } from "@prisma/client";
export class ChatUserLogRepository {
  private prisma = new PrismaClient();

  // async inserChatUserLog(data: any) {
  //   let chatUserLog: any = null;

  //   try {
  //     chatUserLog = await this.prisma.chatUserLogs.create({
  //       data: data,
  //       select: {},
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return chatUserLog;
  // }
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
    return res;
  }

  async insertManyChatUserLog(data: [any]) {
    let res: any = null;
    try {
      res = await this.prisma.chat_user_logs.createMany({
        data: data,
      });
    } catch (err) {
      res = null;
    }
    return res;
  }

  async DeleteByChatIDAndUserID(data: any) {
    let res: any = null;
    try {
      res = await this.prisma.chat_user_logs.deleteMany({
        where: { AND: [{ user_id: data.user_id }, { chat_id: data.chat_id }] },
      });
    } catch (err) {
      console.log(err);
      res = null;
    }
    return res;
  }

  async getChatUserLogAndChatByUserUserID(userID: number) {
    let res: any = null;
    try {
      res = await this.prisma.chat_user_logs.findMany({
        where: { user_id: userID },
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
      console.log(err);
      res = null;
    }
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
      console.log(err);
      chatUserLogs = null;
    }
    return chatUserLogs;
  }
}
