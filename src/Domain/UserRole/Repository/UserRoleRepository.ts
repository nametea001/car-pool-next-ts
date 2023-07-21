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
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

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
}
