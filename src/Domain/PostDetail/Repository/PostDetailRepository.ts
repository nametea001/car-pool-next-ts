import { PrismaClient } from "@prisma/client";

export class PostDetailRepository {
  private prisma = new PrismaClient();

  async findPostDetails(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.district_id) {
      param.push({ id: parseInt(data.district_id) });
    }
    if (data.name_en) {
      param.push({ name_en: data.name_en });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let post_detail: any;
    try {
      post_detail = await this.prisma.post_details.findMany({
        where: whereData,
        select: {},
      });
    } catch (err) {
      post_detail = null;
    }
    this.prisma.$disconnect();
    return post_detail;
  }

  async findPostDetailByPostID(data: any) {
    let post_detail: any;
    try {
      post_detail = await this.prisma.post_details.findFirst({
        where: { post_id: data.post_id },
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
          posts: {
            select: {
              _count: {
                select: {
                  // post_members: { where: { NOT: { user_id: data.user_id } } },
                  post_members: true,
                },
              },
              status: true,
              users: {
                select: {
                  first_name: true,
                  last_name: true,
                  email: true,
                  sex: true,
                  img_path: true,
                },
              },
            },
          },
          // created_user_id: true,
        },
      });
    } catch (err) {
      post_detail = null;
    }
    this.prisma.$disconnect();
    return post_detail;
  }

  async findPostDetailByPostIDAndFindPostMember(data: any) {
    let post_detail: any;
    try {
      post_detail = await this.prisma.post_details.findFirst({
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

          posts: {
            select: {
              post_members: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });
    } catch (err) {
      post_detail = null;
    }
    this.prisma.$disconnect();
    return post_detail;
  }
}
