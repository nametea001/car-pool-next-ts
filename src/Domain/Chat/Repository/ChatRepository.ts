import { PrismaClient } from "@prisma/client";
export class ChatRepository {
  private prisma = new PrismaClient();

  async inserChat(data: any) {
    let chat: any = null;
    let select = {};
    if (data.chat_type === "PRIVATE") {
      select = {
        id: true,
        chat_type: true,
        send_user_id: true,
        created_user_id: true,
        send_user: {
          select: {
            first_name: true,
            last_name: true,
            img_path: true,
          },
        },
        created_user: {
          select: {
            first_name: true,
            last_name: true,
            img_path: true,
          },
        },
      };
    } else {
    }
    try {
      chat = await this.prisma.chats.create({
        data: data,
        select: select,
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
    let select = {};
    if (data.chat_type === "PRIVATE") {
      select = {
        id: true,
        chat_type: true,
        send_user_id: true,
        created_user_id: true,
        send_user: {
          select: {
            first_name: true,
            last_name: true,
            img_path: true,
          },
        },
        created_user: {
          select: {
            first_name: true,
            last_name: true,
            img_path: true,
          },
        },
      };
    } else {
    }

    try {
      chat = await this.prisma.chats.findFirst({
        where: whereData,
        select: select,
      });
    } catch (err) {
      chat = null;
    }
    this.prisma.$disconnect();
    return chat;
  }

  async findChats(data: any) {
    let chats: any = null;
    try {
      chats = await this.prisma.chats.findMany({
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
            select: { msg_type: true, msg: true },
            orderBy: { id: "desc" },
            take: 1,
          },
          _count: {
            select: { chat_user_logs: true },
          },
          created_at: true,
        },
      });
    } catch (err) {
      console.log(err);
      chats = null;
    }
    return chats;
  }
}
