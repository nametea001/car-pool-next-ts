import { ChatRepository } from "../Repository/ChatRepository";

export class ChatFinder {
  private ChatRepository = new ChatRepository();

  async getChatForStart(data: any) {
    const chat = await this.ChatRepository.getChatForStart(data);
    return chat;
  }

  findChats(data: any) {
    // const chats = this.ChatRepository.findChats(data);
    // return chats;
  }
}
