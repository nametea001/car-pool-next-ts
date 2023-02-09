import { PrismaClient } from "@prisma/client";

export class PostRepository {
  private prisma = new PrismaClient();

  async findPosts(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.post_id) {
      param.push({ id: parseInt(data.post_id) });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let posts: any;
    try {
      posts = await this.prisma.posts.findMany({
        where: whereData,
        select: {
          id: true,
          start_amphure_id: true,
          start_thai_amphures: {
            select: {
              name_th: true,
              thai_provinces: {
                select: {
                  id: true,
                  name_th: true,
                },
              },
            },
          },
          end_amphure_id: true,
          end_thai_amphures: {
            select: {
              name_th: true,
              thai_provinces: {
                select: {
                  id: true,
                  name_th: true,
                },
              },
            },
          },
          go_back: true,
          date_time_start: true,
          date_time_back: true,
          created_user_id: true,
          users: {
            select: {
              img_path: true,
            },
          },
        },
      });
    } catch (err) {
      posts = null;
    }
    this.prisma.$disconnect();
    return posts;
  }
}
