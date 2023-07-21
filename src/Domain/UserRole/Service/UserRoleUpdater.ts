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
