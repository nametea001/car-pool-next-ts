import { UserRepository } from "../Repository/UserRepository";

export class UserFinder {
  private userRepository = new UserRepository();

  checkLogin(username: string, password: string) {
    const user = this.userRepository.checkLogin(username, password);
    return user;
  }

  findUsers(data: any) {
    const user = this.userRepository.findUsers(data);
    return user;
  }
}
