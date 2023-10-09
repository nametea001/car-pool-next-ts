import { VerifyUserRepository } from "../Repository/UserVerifyRepository";

export class VerifyUserFinder {
  private VerifyUserRepository = new VerifyUserRepository();

  async findUserVerifys(data: any) {
    return await this.VerifyUserRepository.findUserVerifys(data);
  }

  async findUserVerifyByUserID(userID: number) {
    return await this.VerifyUserRepository.findUserVerifyByUserID(userID);
  }
}
