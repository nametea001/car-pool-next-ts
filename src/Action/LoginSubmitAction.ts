import { UserFinder } from "../Domain/User/Service/UserFinder";

export function LoginSubmitAction(username: string, password: string) {
  const userFinder = new UserFinder();
  const user = userFinder.checkLogin(username, password);
  return user;
}

// export default LoginSubmitAction;
