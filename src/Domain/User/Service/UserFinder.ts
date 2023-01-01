import { UserReposotory } from "../Repository/UserRepository";

export class UserFinder {
  userFinder = new UserReposotory();

  checkLogin(username: string, password: string) {
    const user = this.userFinder.checkLogin(username, password);
    return user;
  }

  findUsers(data: any) {
    const user = this.userFinder.findUsers(data);
    return user;
  }
}
