import { PrismaClient } from "@prisma/client";

export class ThaiDistrictRepository {
  private prisma = new PrismaClient();

  async findDistricts(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.district_id) {
      param.push({ id: parseInt(data.district_id) });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let district: any;
    try {
      district = await this.prisma.districts.findMany({
        where: whereData,
        select: {
          id: true,
          name_th: true,
          // name_en: true,
          province_id: true,
        },
      });
    } catch (err) {
      district = null;
    }
    this.prisma.$disconnect();
    return district;
  }
}
