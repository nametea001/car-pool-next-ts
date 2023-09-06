import { ChatRepository } from "../Repository/ChatRepository";

export class ChatFinder {
  private ChatRepository = new ChatRepository();

  async getChatForStart(data: any) {
    const chat = await this.ChatRepository.getChatForStart(data);
    return chat;
  }

  async findChats(userID: number) {
    const chats = await this.ChatRepository.findChats(userID);
    return chats;
  }
}
