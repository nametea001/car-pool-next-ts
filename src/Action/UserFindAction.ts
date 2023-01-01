import { UserFinder } from "../Domain/User/Service/UserFinder";

export function Userfinds(data: any) {
  const userFinder = new UserFinder();
  let user = userFinder.findUsers(data);
  return user;
}
