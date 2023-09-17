import { PrismaClient } from "@prisma/client";

export class ProvinceRepository {
  private prisma = new PrismaClient();

  async findProvinces(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.province_id) {
      param.push({ id: Number(data.province_id) });
    }
    if (data.name_en) {
      param.push({ name_en: data.name_en });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let provinces: any;
    try {
      provinces = await this.prisma.provinces.findMany({
        where: whereData,
        select: {
          id: true,
          name_th: true,
          name_en: true,
        },
      });
    } catch (err) {
      provinces = null;
    }
    this.prisma.$disconnect();
    return provinces;
  }
}
