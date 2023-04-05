import { PrismaClient } from "@prisma/client";

export class PostMemberRepository {
  private prisma = new PrismaClient();

  async findPostMembers(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.district_id) {
      param.push({ id: parseInt(data.district_id) });
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

  async findPostMemberByPostID(data: any) {
    let district: any;
    try {
      district = await this.prisma.post_details.findFirst({
        where: data,
        select: {
          id: true,
          post_id: true,
          lat_lng_start: true,
          lat_lng_end: true,
          seat: true,
          price: true,
          description: true,
          brand: true,
          model: true,
          vehicle_registration: true,
          color: true,
          // created_user_id: true,
        },
      });
    } catch (err) {
      district = null;
    }
    this.prisma.$disconnect();
    return district;
  }
}
