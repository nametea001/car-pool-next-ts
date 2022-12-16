import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt"; //hash and compare

export class UserReposotory {
  prisma = new PrismaClient();
  async checkLogin(username: string, password: string) {
    if (username !== "" && password !== "") {
      // return josn
      // const user = JSON.parse(
      //   JSON.stringify(
      //     await this.prisma.users.findFirst({
      //       where: {
      //         username: `${username}`,
      //       },
      //       select: {
      //         username: true,
      //         password: true,
      //         first_name: true,
      //         last_name: true,
      //         email: true,
      //         user_role_id: true,
      //         locale: true,
      //       },
      //     })
      //   )
      // );
      // return obj
      const user = await this.prisma.users.findFirst({
        where: {
          username: `${username}`,
        },
        select: {
          username: true,
          password: true,
          first_name: true,
          last_name: true,
          email: true,
          user_role_id: true,
          locale: true,
        },
      });

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
