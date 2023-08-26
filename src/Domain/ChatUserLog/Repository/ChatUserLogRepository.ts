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
