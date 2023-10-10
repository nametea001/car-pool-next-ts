import { ChatRepository } from "../Repository/ChatRepository";

export class ChatFinder {
  private ChatRepository = new ChatRepository();

  async getChatForStart(data: any) {
    return await this.ChatRepository.getChatForStart(data);
  }

  async findChats(userID: number) {
    const chats = await this.ChatRepository.findChats(userID);
    return chats;
  }
}
