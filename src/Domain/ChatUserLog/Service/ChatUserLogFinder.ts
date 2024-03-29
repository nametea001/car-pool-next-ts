import { ChatUserLogRepository } from "../Repository/ChatUserLogRepository";

export class ChatUserLogFinder {
  private ChatUserLogUserLogRepository = new ChatUserLogRepository();

  async getChatUserLogAndChatByUserUserID(userID: number) {
    return await this.ChatUserLogUserLogRepository.getChatUserLogAndChatByUserUserID(
      userID
    );
  }

  async countChatUserLogsByUserID(userID: number) {
    return await this.ChatUserLogUserLogRepository.countChatUserLogsByUserID(
      userID
    );
  }
}
