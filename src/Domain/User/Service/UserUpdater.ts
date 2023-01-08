import { UserReposotory } from "../Repository/UserRepository";

export class UserUpdater {
  private userReposotory = new UserReposotory();

  userEdit(data: any, userId: number, updateBy: number) {
    let row = this.MapToRow(data, updateBy);
    const user = this.userReposotory.UserEdit(row, userId);
    return user;
  }

  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("username" in data) {
      result.username = data.username;
    }
    if ("first_name" in data) {
      result.first_name = data.first_name;
    }
    if ("last_name" in data) {
      result.last_name = data.last_name;
    }
    // if (data.hasOwnProperty("username")) {
    //   result.id = data.id;
    // }
    // if (result.le {}) {
    // }
    // console.log(Object.keys(result).length === 0);
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
