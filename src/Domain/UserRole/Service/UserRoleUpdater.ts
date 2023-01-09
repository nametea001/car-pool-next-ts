import { UserRoleRepository } from "../Repository/UserRoleRepository";

export class UserRoleUpdater {
  private UserRoleRepository = new UserRoleRepository();

  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("user_role_name" in data) {
      result.username = data.username;
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
