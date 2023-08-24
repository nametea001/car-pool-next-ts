import { ChatDetailRepository } from "../Repository/ChatDetailRepository";

export class ChatDetailUpdater {
  private chatDetailRepository = new ChatDetailRepository();

  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("chat_id" in data) {
      result.chat_id = data.chat_id;
    }
    if ("msg_type" in data) {
      result.msg_type = data.msg_type;
    }
    if ("msg" in data) {
      result.msg = data.msg;
    }
    if ("lat_lng" in data) {
      result.lat_lng = data.lat_lng;
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
