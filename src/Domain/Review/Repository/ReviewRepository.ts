import { PrismaClient } from "@prisma/client";

export class ReviewRepository {
  private prisma = new PrismaClient();

  async findReviews(data: any) {
    //  praram controll
    let param: any[] = [];
    // if (data.review_id) {
    //   param.push({ id: parseInt(data.review_id) });
    // }
    if (data.post_id) {
      param.push({ post_id: parseInt(data.post_id) });
    }
    if (data.user_id) {
      param.push({ user_id: parseInt(data.user_id) });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let review: any;
    try {
      review = await this.prisma.reviews.findMany({
        where: whereData,
        select: {
          id: true,
          post_id: true,
          // user_id: true,
          created_user_id: true,
          description: true,
          score: true,
          users_reviews_created: {
            select: {
              first_name: true,
              last_name: true,
              img_path: true,
            },
          },
          posts: {
            select: {
              end_district: {
                select: {
                  name_th: true,
                },
              },
            },
          },
        },
      });
    } catch (err) {
      review = null;
    }
    this.prisma.$disconnect();
    return review;
  }
}
