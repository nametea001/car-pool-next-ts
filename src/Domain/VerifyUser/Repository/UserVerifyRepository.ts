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
          user_id: true,
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
          user_id: true,
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

  async findUserVerifys(data: any) {
    //  praram controll
    let userVerify: any = null;
    try {
      userVerify = await this.prisma.verify_users.findMany({
        select: {
          id: true,
          user_id: true,
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

  async findUserVerifyByUserID(userID: number) {
    let userVerify: any = null;
    try {
      userVerify = await this.prisma.verify_users.findFirst({
        where: { user_id: userID },
        select: {
          id: true,
          user_id: true,
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
