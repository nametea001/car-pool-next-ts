import { UserRoleRepository } from "../Repository/UserRoleRepository";

export class UserRoleFinder {
  private UserRoleRepository = new UserRoleRepository();

  findUsersRoles(data: any) {
    const user = this.UserRoleRepository.findUserRoles(data);
    return user;
  }
}
