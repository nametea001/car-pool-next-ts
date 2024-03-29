import { ChatRepository } from "../Repository/ChatRepository";

export class ChatUpdater {
  private chatRepository = new ChatRepository();

  async inserChat(data: any, updateBy: number) {
    const row = this.MapToRow(data, updateBy, true);
    return await this.chatRepository.inserChat(row);
  }

  async updateChatSendMsg(chatID: number, updateBy: number) {
    const row = this.MapToRow({}, updateBy, false, true);
    return await this.chatRepository.updateChatSendMsg(row, chatID);
  }

  async updateChatByPostID(data: any, postID: number, updateBy: number) {
    const row = this.MapToRow(data, updateBy, false, true);
    return await this.chatRepository.updateChatByPostID(row, postID);
  }

  // map to DB
  private MapToRow(
    data: any,
    updateBy: number,
    create: boolean = false,
    updateDateTime: boolean = false
  ) {
    let result: any = {};

    if ("chat_type" in data) {
      result.chat_type = data.chat_type;
    }
    if ("send_user_id" in data) {
      result.send_user_id = data.send_user_id;
    }
    if ("send_post_id" in data) {
      result.send_post_id = data.send_post_id;
    }

    if (Object.keys(result).length !== 0 || updateDateTime) {
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
