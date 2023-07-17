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
      param.push({ post_id: data.post_id });
    }
    if (data.user_id) {
      param.push({ user_id: data.user_id });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let review: any;
    try {
      review = await this.prisma.reviews.findMany({
        where: whereData,

        select: {
          id: true,
          post_id: true,
          user_id: true,
          created_user_id: true,
          description: true,
          users_reviews_created: {
            select: {
              img_path: true,
            },
          },
        },
      });
    } catch (err) {
      // console.log(err);
      review = null;
    }
    this.prisma.$disconnect();
    return review;
  }
}
