import { PrismaClient } from "@prisma/client";

export class DistrictRepository {
  private prisma = new PrismaClient();

  async findDistricts(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.district_id) {
      param.push({ id: Number(data.district_id) });
    }
    if (data.name_en) {
      param.push({ name_en: data.name_en });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let district: any;
    try {
      district = await this.prisma.districts.findMany({
        where: whereData,
        select: {
          id: true,
          name_th: true,
          name_en: true,
          province_id: true,
        },
      });
    } catch (err) {
      district = null;
    }
    this.prisma.$disconnect();
    return district;
  }

  async findDistrictByName(name: string) {
    //  praram controll

    let district: any;
    try {
      district = await this.prisma.districts.findFirst({
        where: { OR: [{ name_en: name }, { name_th: name }] },
        select: {
          id: true,
          name_th: true,
          name_en: true,
          province_id: true,
        },
      });
    } catch (err) {
      district = null;
    }
    this.prisma.$disconnect();
    return district;
  }

  async findDistrictByProvinceName(name: string) {
    let district: any;
    try {
      district = await this.prisma.districts.findFirst({
        where: {
          OR: [
            { provinces: { name_en: name } },
            { provinces: { name_th: name } },
          ],
        },
        select: {
          id: true,
          name_th: true,
          name_en: true,
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
