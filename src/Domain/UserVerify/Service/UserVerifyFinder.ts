import { UserVerifyRepository } from "../Repository/UserVerifyRepository";

export class UserVerifyFinder {
  private UserVerifyRepository = new UserVerifyRepository();

  async findUserVerifys(data: any) {
    const userVerifys = await this.UserVerifyRepository.findUserVerifys(data);
    return userVerifys;
  }
}
