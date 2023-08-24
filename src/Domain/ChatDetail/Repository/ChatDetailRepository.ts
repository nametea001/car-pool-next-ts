import { PrismaClient } from "@prisma/client";
export class ChatDetailRepository {
  private prisma = new PrismaClient();

  async getChatDetailByChatID(chatID: number) {
    let chatDetail: any;

    try {
      chatDetail = await this.prisma.chat_details.findMany({
        where: { chat_id: chatID },
        select: {
          id: true,
          chat_id: true,
          msg_type: true,
          msg: true,
          created_user_id: true,
          created_at: true,
          users: {
            select: { first_name: true, last_name: true },
          },
        },
      });
    } catch (err) {
      chatDetail = null;
    }
    this.prisma.$disconnect();
    return chatDetail;
  }
}
