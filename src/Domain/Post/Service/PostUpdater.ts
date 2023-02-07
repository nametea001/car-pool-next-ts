import { PostRepository } from "../Repository/PostRepository";

export class PostUpdater {
  private userReposotory = new PostRepository();

  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("name_th" in data) {
      result.name_th = data.name_th;
    }
    if ("name_en" in data) {
      result.name_en = data.name_en;
    }

    if (Object.keys(result).length !== 0) {
      if (create) {
        result.created_at = this.DateTimeToSQL();
        result.created_user_id = updateBy;
      }
      result.updated_at = this.DateTimeToSQL();
      result.updated_user_id = updateBy;
    }

    return result;
  }

  // date formath
  private DateTimeToSQL() {
    let datetime = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    )
      .toJSON()
      .slice(0, 19)
      .replace("T", " ");
    return datetime;
  }
}
