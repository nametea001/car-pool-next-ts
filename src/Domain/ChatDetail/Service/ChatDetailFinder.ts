import { ChatDetailRepository } from "../Repository/ChatDetailRepository";

export class ChatDetailFinder {
  private ChatDetailRepository = new ChatDetailRepository();

  async getChatDetailByChatID(chatID: number) {
    const chatDetail = await this.ChatDetailRepository.getChatDetailByChatID(
      chatID
    );
    return chatDetail;
  }
}
