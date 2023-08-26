import { PrismaClient } from "@prisma/client";
export class ChatRepository {
  private prisma = new PrismaClient();

  async inserChat(data: any) {
    let chat: any = null;
    try {
      chat = await this.prisma.chats.create({
        data: data,
        select: {
          id: true,
          send_user_id: true,
          send_post_id: true,
          created_user_id: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
    return chat;
  }

  async getChatForStart(data: any) {
    let chat: any = null;
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
        select: {
          id: true,
          send_user_id: true,
          send_post_id: true,
          created_user_id: true,
        },
      });
    } catch (err) {
      chat = null;
    }
    this.prisma.$disconnect();
    return chat;
  }
}
