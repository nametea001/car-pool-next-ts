import { VerifyUserRepository } from "../Repository/UserVerifyRepository";

export class VerifyUserUpdater {
  private verifyUserRepository = new VerifyUserRepository();

  async insertUserVerify(data: any, updateBy: number) {
    const row = this.MapToRow(data, updateBy, true);
    return await this.verifyUserRepository.insertUserVerify(row);
  }

  async updateUserVerifyByID(
    data: any,
    updateBy: number,
    verifyUserID: number
  ) {
    const row = this.MapToRow(data, updateBy);
    
    return await this.verifyUserRepository.updateUserVerifyByID(
      row,
      verifyUserID
    );
  }
  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("status" in data) {
      result.status = data.status;
    }
    if ("id_card_path" in data) {
      result.id_card_path = data.id_card_path;
    }
    if ("driver_licence_path" in data) {
      result.driver_licence_path = data.driver_licence_path;
    }
    if ("description" in data) {
      result.description = data.description;
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
