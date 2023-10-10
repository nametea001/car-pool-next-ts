import { UserRepository } from "../Repository/UserRepository";

export class UserFinder {
  private userRepository = new UserRepository();

  async checkLogin(username: string, password: string) {
    return await this.userRepository.checkLogin(username, password);
  }

  async getUpdateByID(userID: number) {
    return await this.userRepository.getUpdateByID(userID);
  }

  async findUsers(data: any) {
    return await this.userRepository.findUsers(data);
  }
}
