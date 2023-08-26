import { ChatUserLogRepository } from "../Repository/ChatUserLogRepository";

export class ChatUserLogUpdater {
  private chatUserLogRepository = new ChatUserLogRepository();

  // async inserChatUserLog(data: any, updateBy: number) {
  //   const row = this.MapToRow(data, updateBy, true);
  //   return await this.chatUserLogRepository.inserChatUserLog(row, updateBy);
  // }

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
