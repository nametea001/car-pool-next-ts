import { PrismaClient } from "@prisma/client";

export class ThaiProvenceRepository {
  private prisma = new PrismaClient();

  async findProvences(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.provence_id) {
      param.push({ id: parseInt(data.provence_id) });
    }
    let whereData = param.length !== 0 ? { OR: param } : {}; //check param is empty

    let provences: any;
    try {
      provences = await this.prisma.thai_provinces.findMany({
        where: whereData,
        select: {
          id: true,
          name_th: true,
          name_en: true,
        },
      });
    } catch (err) {
      provences = null;
    }
    this.prisma.$disconnect();
    return provences;
  }
}
