import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt"; //hash and compare
export class UserRoleRepository {
  private prisma = new PrismaClient();

  async findUserRoles(data: any) {
    //  praram controll
    let param: any[] = [];
    // if (data.user_id) {
    //   param.push({ id: parseInt(data.user_id) });
    // }
    // if (data.username) {
    //   param.push({ username: data.username.toString() });
    // }
    let whereData = param.length !== 0 ? { OR: param } : {}; //check param is empty

    let user: any;
    try {
      user = await this.prisma.user_roles.findMany({
        where: whereData,
        select: {
          id: true,
          user_role_name: true,
        },
      });
    } catch (err) {
      user = null;
    }
    this.prisma.$disconnect();
    return user;
  }

  async checkLogin(username: string, password: string) {
    if (username !== "" && password !== "") {
      let user: any;
      try {
        user = await this.prisma.users.findFirst({
          where: {
            username: `${username}`,
          },
          select: {
            id: true,
            username: true,
            password: true,
            first_name: true,
            last_name: true,
            email: true,
            user_role_id: true,
            locale: true,
          },
        });
      } catch {
        user = null;
      }

      this.prisma.$disconnect();
      // const saltRounds = 10;
      // let x = bcrypt.hashSync("tool", saltRounds);
      // console.log(x);
      // console.log(
      //   bcrypt.compareSync(
      //     password,
      //     "$2b$10$IbazMriR5GYoIZFDQlLyde.M/c9WMw3dIzVBcfdXZf0YVYSBWQl2W"
      //   )
      // );
      if (user && bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    }
  }
}
