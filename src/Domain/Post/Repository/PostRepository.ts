import { PrismaClient } from "@prisma/client";
import { now } from "next-auth/client/_utils";

export class PostRepository {
  private prisma = new PrismaClient();

  async addPostAndPostDetail(dataPost: any, dataPostdetail: any) {
    let posts: any = null;
    let dataInsert: any = null;
    {
      if (dataPost.go_back) {
        dataInsert = {
          name_start: dataPost.name_start,
          name_end: dataPost.name_end,
          start_district_id: dataPost.start_district_id,
          end_district_id: dataPost.end_district_id,
          go_back: dataPost.go_back,
          date_time_start: new Date(dataPost.date_time_start),
          date_time_back: new Date(dataPost.date_time_back),
          status: "NEW",
          created_user_id: dataPost.created_user_id,
          created_at: dataPost.created_at,
          updated_user_id: dataPost.updated_user_id,
          updated_at: dataPost.updated_at,
          post_details: {
            create: {
              lat_lng_start: dataPostdetail.lat_lng_start,
              lat_lng_end: dataPostdetail.lat_lng_end,
              seat: dataPostdetail.seat,
              price: dataPostdetail.price,
              description: dataPostdetail.description,
              brand: dataPostdetail.brand,
              model: dataPostdetail.model,
              vehicle_registration: dataPostdetail.vehicle_registration,
              color: dataPostdetail.color,
              created_at: dataPostdetail.created_at,
              created_user_id: dataPostdetail.created_user_id,
              updated_at: dataPostdetail.updated_at,
              updated_user_id: dataPostdetail.updated_user_id,
            },
          },
        };
      } else {
        dataInsert = {
          name_start: dataPost.name_start,
          name_end: dataPost.name_end,
          start_district_id: dataPost.start_district_id,
          end_district_id: dataPost.end_district_id,
          go_back: dataPost.go_back,
          date_time_start: new Date(dataPost.date_time_start),
          date_time_back: null,
          status: "NEW",
          created_user_id: dataPost.created_user_id,
          created_at: dataPost.created_at,
          updated_user_id: dataPost.updated_user_id,
          updated_at: dataPost.updated_at,
          post_details: {
            create: {
              lat_lng_start: dataPostdetail.lat_lng_start,
              lat_lng_end: dataPostdetail.lat_lng_end,
              seat: dataPostdetail.seat,
              price: dataPostdetail.price,
              description: dataPostdetail.description,
              brand: dataPostdetail.brand,
              model: dataPostdetail.model,
              vehicle_registration: dataPostdetail.vehicle_registration,
              color: dataPostdetail.color,
              created_at: dataPostdetail.created_at,
              created_user_id: dataPostdetail.created_user_id,
              updated_at: dataPostdetail.updated_at,
              updated_user_id: dataPostdetail.updated_user_id,
            },
          },
        };
      }
    }
    try {
      posts = this.prisma.posts.create({
        data: dataInsert,
        select: {
          name_start: true,
          name_end: true,
          go_back: true,
          post_details: {
            select: {
              lat_lng_start: true,
              lat_lng_end: true,
              seat: true,
              price: true,
              description: true,
              brand: true,
              model: true,
              vehicle_registration: true,
              color: true,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
    return posts;
  }

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
          name_start: true,
          name_end: true,
          start_district_id: true,
          // start_district: {
          //   select: {
          //     name_th: true,
          //     provinces: {
          //       select: {
          //         id: true,
          //         name_th: true,
          //       },
          //     },
          //   },
          // },
          end_district_id: true,
          // end_district: {
          //   select: {
          //     name_th: true,
          //     provinces: {
          //       select: {
          //         id: true,
          //         name_th: true,
          //       },
          //     },
          //   },
          // },
          go_back: true,
          date_time_start: true,
          date_time_back: true,
          created_user_id: true,
          post_details: {
            select: {
              seat: true,
              price: true,
            },
          },
          users: {
            select: {
              img_path: true,
            },
          },
          _count: {
            select: {
              post_members: true,
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
