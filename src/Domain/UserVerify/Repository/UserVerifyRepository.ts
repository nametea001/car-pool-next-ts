import { PrismaClient } from "@prisma/client";
export class UserVerifyRepository {
  private prisma = new PrismaClient();

  async findUserVerifys(data: any) {
    //  praram controll
    let userVerify: any = null;
    try {
      userVerify = await this.prisma.user_verify.findMany({
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
