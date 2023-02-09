import { PrismaClient } from "@prisma/client";

export class ThaiAumphureRepository {
  private prisma = new PrismaClient();

  async findAumphures(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.aumphure_id) {
      param.push({ id: parseInt(data.aumphure_id) });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let aumphure: any;
    try {
      aumphure = await this.prisma.thai_amphures.findMany({
        where: whereData,
        select: {
          id: true,
          name_th: true,
          name_en: true,
        },
      });
    } catch (err) {
      aumphure = null;
    }
    this.prisma.$disconnect();
    return aumphure;
  }
}
