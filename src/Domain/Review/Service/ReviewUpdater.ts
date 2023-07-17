import { ReviewRepository } from "../Repository/ReviewRepository";

export class ReviewUpdater {
  private reviewReposotory = new ReviewRepository();

  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("post_id" in data) {
      result.post_id = data.post_id;
    }
    if ("user_id" in data) {
      result.user_id = data.user_id;
    }
    if ("score" in data) {
      result.score = data.score;
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
