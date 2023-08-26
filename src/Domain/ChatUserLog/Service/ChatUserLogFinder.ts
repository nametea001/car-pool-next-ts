import { ChatUserLogRepository } from "../Repository/ChatUserLogRepository";

export class ChatUserLogFinder {
  private ChatUserLogUserLogRepository = new ChatUserLogRepository();

  async countChatUserLogsByUserID(userID: number) {
    const chatUserLogs =
      await this.ChatUserLogUserLogRepository.countChatUserLogsByUserID(userID);
    return chatUserLogs;
  }
}
