import { PrismaClient } from "@prisma/client";

export class ReviewRepository {
  private prisma = new PrismaClient();

  async addReview(data: any) {
    let review: any = null;
    try {
      review = await this.prisma.reviews.create({
        data: data,
        select: {
          id: true,
          post_id: true,
          score: true,
          description: true,
          posts: {
            select: {
              id: true,
              name_start: true,
              name_end: true,
              start_district_id: true,
              end_district_id: true,
              date_time_start: true,
              date_time_back: true,
              created_user_id: true,
              status: true,
              post_details: {
                select: {
                  seat: true,
                  price: true,
                },
              },
              users: {
                select: {
                  img_path: true,
                  first_name: true,
                  last_name: true,
                  email: true,
                  sex: true,
                },
              },
              _count: {
                select: {
                  post_members: true,
                },
              },
            },
          },
          created_at: true,
          created_user_id: true,
        },
      });
    } catch (err) {
      review = null;
    }
    this.prisma.$disconnect();
    return review;
  }

  async editReview(reviewID: number, data: any) {
    let review: any = null;
    try {
      review = await this.prisma.reviews.update({
        where: { id: reviewID },
        data: data,
        select: {
          id: true,
          post_id: true,
          score: true,
          description: true,
          posts: {
            select: {
              id: true,
              name_start: true,
              name_end: true,
              start_district_id: true,
              end_district_id: true,
              date_time_start: true,
              date_time_back: true,
              created_user_id: true,
              status: true,
              post_details: {
                select: {
                  seat: true,
                  price: true,
                },
              },
              users: {
                select: {
                  img_path: true,
                  first_name: true,
                  last_name: true,
                  email: true,
                  sex: true,
                },
              },
              _count: {
                select: {
                  post_members: true,
                },
              },
            },
          },
          created_at: true,
        },
      });
    } catch (err) {
      review = null;
    }
    this.prisma.$disconnect();
    return review;
  }

  async findReviews(data: any) {
    let param: any[] = [];

    if (data.post_id) {
      param.push({ post_id: Number(data.post_id) });
    }
    if (data.user_id) {
      param.push({ user_id: Number(data.user_id) });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let review: any;
    try {
      review = await this.prisma.reviews.findMany({
        orderBy: { created_at: "desc" },
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
              // end_district: {
              //   select: {
              //     name_th: true,
              //   },
              // },
              name_end: true,
              date_time_start: true,
            },
          },
          created_at: true,
        },
      });
    } catch (err) {
      review = null;
    }
    this.prisma.$disconnect();
    return review;
  }

  async avgReviews(user_id: number) {
    let avg: any = null;
    try {
      avg = await this.prisma.reviews.aggregate({
        where: {
          user_id: user_id,
        },
        _avg: {
          score: true,
        },
      });
      return avg;
    } catch (err) {
      avg = null;
    }
    this.prisma.$disconnect();
    return avg;
  }

  async findMyReviews(userID: number) {
    let review: any;
    try {
      review = await this.prisma.reviews.findMany({
        orderBy: { created_at: "desc" },
        where: { created_user_id: userID },
        select: {
          id: true,
          // post_id: true,
          score: true,
          description: true,
          posts: {
            select: {
              id: true,
              name_start: true,
              name_end: true,
              start_district_id: true,
              end_district_id: true,
              date_time_start: true,
              date_time_back: true,
              created_user_id: true,
              status: true,
              post_details: {
                select: {
                  seat: true,
                  price: true,
                },
              },
              users: {
                select: {
                  img_path: true,
                  first_name: true,
                  last_name: true,
                  email: true,
                  sex: true,
                },
              },
              _count: {
                select: {
                  post_members: true,
                },
              },
            },
          },
          created_at: true,
        },
      });
    } catch (err) {
      review = null;
    }
    this.prisma.$disconnect();
    return review;
  }
}
