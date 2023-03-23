import { PrismaClient } from "@prisma/client";

export class ProvinceRepository {
  private prisma = new PrismaClient();

  async findProvinces(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.province_id) {
      param.push({ id: parseInt(data.province_id) });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let provinces: any;
    try {
      provinces = await this.prisma.provinces.findMany({
        where: whereData,
        select: {
          id: true,
          name_th: true,
          // name_en: true,
        },
      });
    } catch (err) {
      provinces = null;
    }
    this.prisma.$disconnect();
    return provinces;
  }
}
