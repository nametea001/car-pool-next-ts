import { UserReposotory } from "../Repository/UserRepository";

export class UserFinder {
  private userReposotory = new UserReposotory();

  checkLogin(username: string, password: string) {
    const user = this.userReposotory.checkLogin(username, password);
    return user;
  }

  findUsers(data: any) {
    const user = this.userReposotory.findUsers(data);
    return user;
  }
}
