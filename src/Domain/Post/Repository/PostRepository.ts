import { PrismaClient } from "@prisma/client";

export class PostRepository {
  private prisma = new PrismaClient();

  async addPostAndPostDetail(dataPost: any, dataPostdetail: any) {
    let posts: any = null;
    let dataInsert: any = null;

    dataInsert = {
      name_start: dataPost.name_start,
      name_end: dataPost.name_end,
      start_district_id: dataPost.start_district_id,
      end_district_id: dataPost.end_district_id,
      is_back: false,
      date_time_start: this._timeBankokToDB(dataPost.date_time_start),
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
      post_members: {
        create: {
          user_id: dataPostdetail.created_user_id,
          created_at: dataPostdetail.created_at,
          created_user_id: dataPostdetail.created_user_id,
          updated_at: dataPostdetail.updated_at,
          updated_user_id: dataPostdetail.updated_user_id,
        },
      },
    };

    if (dataPost.is_back) {
      dataInsert.date_time_back = this._timeBankokToDB(dataPost.date_time_back);
      dataInsert.is_back = true;
    }

    try {
      posts = this.prisma.posts.create({
        data: dataInsert,
        select: {
          name_start: true,
          name_end: true,
          is_back: true,
          date_time_start: true,
          date_time_back: true,
          post_details: {
            orderBy: {
              created_at: "desc",
            },
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
      });
    } catch (err) {
      console.log(err);
    }
    return posts;
  }

  async updatePosts(whereData: any, dataPost: any) {
    let resData: any = null;
    try {
      resData = await this.prisma.posts.update({
        where: whereData,
        data: dataPost,
      });
    } catch (err) {
      resData = null;
    }
    return resData;
  }

  async findPosts(data: any) {
    //  praram controll
    let param: any[] = [];

    param.push({
      status: "NEW",
    });

    param.push({
      is_back: data.is_back === "true",
    });

    param.push({
      date_time_start: {
        gte: new Date(data.date_time_start),
      },
    });

    if (data.date_time_back !== "" && data.is_back === "true") {
      param.push({
        date_time_back: {
          gte: new Date(data.date_time_back),
        },
      });
    }

    // start all district or only district
    if (parseInt(data.start_district_id) !== 0) {
      param.push({
        start_district_id: data.start_district_id,
      });
    } else {
      param.push({
        start_district: {
          province_id: parseInt(data.start_province_id),
        },
      });
    }

    // end all district or only district or region
    if (parseInt(data.end_district_id) !== 0) {
      param.push({
        end_district_id: data.end_district_id,
      });
    } else if (parseInt(data.end_province_id) !== 0) {
      param.push({
        end_district: {
          end_district_id: parseInt(data.end_district_id),
        },
      });
    }

    // if (data.post_id) {
    //   param.push({ id: parseInt(data.post_id) });
    // }
    // let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty
    let whereData = {};

    let posts: any;
    try {
      posts = await this.prisma.posts.findMany({
        where: {},
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
          is_back: true,
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
      });
    } catch (err) {
      posts = null;
    }
    this.prisma.$disconnect();
    return posts;
  }

  async findStatusPostByID(postID: number) {
    let resData: any = null;

    try {
      resData = this.prisma.posts.findFirst({
        where: { id: postID },
        select: { id: true, status: true },
      });
    } catch (err) {
      resData = null;
    }
    return resData;
  }

  private _timeBankokToDB(dateTime: any) {
    let dateTimeFormat = new Date(dateTime);
    dateTimeFormat.setHours(dateTimeFormat.getHours() + 7);
    return dateTimeFormat;
  }
}
