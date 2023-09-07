import { ChatUserLogRepository } from "../Repository/ChatUserLogRepository";

export class ChatUserLogUpdater {
  private chatUserLogRepository = new ChatUserLogRepository();

  async insertChatUserLog(data: any, updateBy: number) {
    const row = await this.MapToRow(data, updateBy, true);
    return this.chatUserLogRepository.insertChatUserLog(row);
  }
  async insertManyChatUserLog(
    chatID: number,
    postMembers: [],
    updateBy: number
  ) {
    let rows: any[] = [];
    postMembers.forEach((user: any) => {
      let data = { chat_id: chatID, user_id: user.user_id };
      let row = this.MapToRow(data, updateBy, true);
      rows.push(row);
    });
    return await this.chatUserLogRepository.insertManyChatUserLog(rows);
  }

  async DeleteByChatIDAndUserID(data: any) {
    return await this.chatUserLogRepository.DeleteByChatIDAndUserID(data);
  }

  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("chat_id" in data) {
      result.chat_id = data.chat_id;
    }
    if ("user_id" in data) {
      result.user_id = data.user_id;
    }

    if (Object.keys(result).length !== 0) {
      let dataTime = new Date();
      dataTime.setHours(dataTime.getHours() + 7);
      if (create) {
        result.created_at = dataTime;
        result.created_user_id = updateBy;
      }
      result.updated_at = dataTime;
      result.updated_user_id = updateBy;
    }

    return result;
  }
}
