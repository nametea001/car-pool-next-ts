import { ReviewUserLogRepository } from "../Repository/ReviewUserLogRepository";

export class ReviewUserLogUpdater {
  private reviewUserLogReposotory = new ReviewUserLogRepository();

  async insertManyReviewUserLog(postID: number, users: [], updateBy: number) {
    let rows: any[] = [];
    users.forEach((user: any) => {
      if (user.user_id !== updateBy) {
        let data = { chat_id: postID, user_id: user.user_id };
        let row = this.MapToRow(data, updateBy, true);
        rows.push(row);
      }
    });
    return await this.reviewUserLogReposotory.insertManyReviewUserLog(rows);
  }

  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("post_id" in data) {
      result.post_id = data.post_id;
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
