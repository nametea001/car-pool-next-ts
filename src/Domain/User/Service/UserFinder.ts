import { UserRepository } from "../Repository/UserRepository";

export class UserFinder {
  private userRepository = new UserRepository();

  async checkLogin(username: string, password: string) {
    const user = await this.userRepository.checkLogin(username, password);
    return user;
  }

  async findUsers(data: any) {
    const user = await this.userRepository.findUsers(data);
    return user;
  }
}
