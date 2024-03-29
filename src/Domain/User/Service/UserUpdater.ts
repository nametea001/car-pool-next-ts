import { create } from "domain";
import { UserRepository } from "../Repository/UserRepository";

export class UserUpdater {
  private userReposotory = new UserRepository();

  async userInsert(data: any) {
    let errUser: any = {};
    let row = this.MapToRow(data, 1, true);
    row.user_role_id = 5;
    const checkUser = await this.userReposotory.findUserForCheckRegister(row);
    if (!checkUser) {
      const user = this.userReposotory.userInsert(row);
      return user;
    } else if (checkUser) {
      return null;
    }
    return null;
  }

  async userEdit(data: any, userId: number, updateBy: number) {
    let row = this.MapToRow(data, updateBy);
    return await this.userReposotory.userEdit(row, userId);
  }

  async changePassword(data: any, updateBy: number) {
    if (data.password === data.confirm_password) {
      let row = this.MapToRow(data, updateBy);
      return await this.userReposotory.changePassword(row, updateBy);
    }
    return null;
  }

  async userUpdateProfile(imgPath: string, userID: number) {
    return await this.userReposotory.userUpdateProfile(imgPath, userID);
  }

  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("username" in data) {
      result.username = data.username;
    }
    if ("password" in data) {
      result.password = data.password;
    }
    if ("first_name" in data) {
      result.first_name = data.first_name;
    }
    if ("last_name" in data) {
      result.last_name = data.last_name;
    }
    if ("email" in data) {
      result.email = data.email;
    }
    if ("user_role_id" in data) {
      result.user_role_id = data.user_role_id;
    }
    if ("img_path" in data) {
      result.img_path = data.img_path;
    }
    if ("sex" in data) {
      result.sex = data.sex;
    }
    if ("enabled" in data) {
      result.enabled = data.enabled;
    }
    // if (data.hasOwnProperty("username")) {
    //   result.id = data.id;
    // }
    // if (result.le {}) {
    // }
    // console.log(Object.keys(result).length === 0);
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
