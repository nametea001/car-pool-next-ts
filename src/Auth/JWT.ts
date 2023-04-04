import { sign, verify, Secret } from "jsonwebtoken";

export class JWT {
  createToken(user: any) {
    try {
      // delete user.locale;
      // delete user.img_path;
      // delete user.first_name;
      // delete user.last_name;
      return sign(user, process.env.NEXTAUTH_SECRET as Secret);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  verifyToken(token: any) {
    try {
      const verifyToken = verify(token, process.env.NEXTAUTH_SECRET as Secret);
      return verifyToken;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
