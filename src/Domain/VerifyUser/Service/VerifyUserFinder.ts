import { VerifyUserRepository } from "../Repository/UserVerifyRepository";

export class VerifyUserFinder {
  private VerifyUserRepository = new VerifyUserRepository();

  async findUserVerifys(whereData: any) {
    return await this.VerifyUserRepository.findUserVerifys(whereData);
  }

  async findUserVerifyByUserID(userID: number) {
    return await this.VerifyUserRepository.findUserVerifyByUserID(userID);
  }
}
