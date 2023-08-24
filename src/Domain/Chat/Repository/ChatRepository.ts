import { PrismaClient } from "@prisma/client";
export class ChatRepository {
  private prisma = new PrismaClient();

  async getChatForStart(data: any) {
    let chat: any;
    let whereData = {};
    if (data.chat_type === "PRIVATE") {
      whereData = {
        AND: [
          { chat_type: "PRIVATE" },
          {
            OR: [
              {
                AND: [
                  { send_user_id: data.send_user_id },
                  { created_user_id: data.created_user_id },
                ],
              },
              {
                AND: [
                  { send_user_id: data.created_user_id },
                  { created_user_id: data.send_user_id },
                ],
              },
            ],
          },
        ],
      };
    } else {
      whereData = {
        chat_type: "GROUP",
        send_post_id: data.send_post_id,
      };
    }

    try {
      chat = await this.prisma.chats.findFirst({
        where: whereData,
        select: { id: true },
      });
    } catch (err) {
      chat = null;
    }
    this.prisma.$disconnect();
    return chat;
  }
}
