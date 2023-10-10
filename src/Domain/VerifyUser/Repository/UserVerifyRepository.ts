import { PrismaClient } from "@prisma/client";
export class VerifyUserRepository {
  private prisma = new PrismaClient();

  async insertUserVerify(data: any) {
    let userVerify: any = null;
    try {
      userVerify = await this.prisma.verify_users.create({
        data: data,
        select: {
          id: true,
          status: true,
          id_card_path: true,
          driver_licence_path: true,
        },
      });
    } catch (err) {
      userVerify = null;
    }
    this.prisma.$disconnect();
    return userVerify;
  }

  async updateUserVerifyByID(data: any, verifyUserID: number) {
    let userVerify: any = null;
    try {
      userVerify = await this.prisma.verify_users.update({
        where: { id: verifyUserID },
        data: data,
        select: {
          id: true,
          status: true,
          id_card_path: true,
          driver_licence_path: true,
          created_user_id: true,
        },
      });
    } catch (err) {
      userVerify = null;
    }
    this.prisma.$disconnect();
    return userVerify;
  }

  async findUserVerifys(whereData: any) {
    //  praram controll
    let userVerify: any = null;
    try {
      userVerify = await this.prisma.verify_users.findMany({
        where: whereData,
        select: {
          id: true,
          status: true,
          id_card_path: true,
          driver_licence_path: true,
          description: true,
          created_user_id: true,
          users: {
            select: {
              username: true,
              first_name: true,
              last_name: true,
              email: true,
              sex: true,
              user_role_id: true,
              user_roles: {
                select: {
                  user_role_name: true,
                },
              },
            },
          },
        },
      });
    } catch (err) {
      userVerify = null;
    }
    this.prisma.$disconnect();
    return userVerify;
  }

  async findUserVerifyByUserID(userID: number) {
    let userVerify: any = null;
    try {
      userVerify = await this.prisma.verify_users.findFirst({
        where: { created_user_id: userID },
        select: {
          id: true,
          status: true,
          id_card_path: true,
          driver_licence_path: true,
        },
      });
    } catch (err) {
      userVerify = null;
    }
    this.prisma.$disconnect();
    return userVerify;
  }
}
