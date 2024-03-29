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
          id: true,
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
      posts = null;
    }
    this.prisma.$disconnect();
    return posts;
  }

  async updatePosts(whereData: any, dataPost: any) {
    let resData: any = null;
    try {
      resData = await this.prisma.posts.update({
        where: whereData,
        data: dataPost,
        select: {
          id: true,
          name_start: true,
          name_end: true,
          start_district_id: true,
          end_district_id: true,
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
          post_members: {
            select: { user_id: true },
          },
          _count: {
            select: {
              post_members: true,
            },
          },
        },
      });
    } catch (err) {
      resData = null;
    }
    this.prisma.$disconnect();
    return resData;
  }

  async findPosts(data: any, userID: number) {
    //  praram controll
    let param: any[] = [];
    param.push({
      status: "NEW",
    });

    if ("date_time_start" in data) {
      const tempDateTime: any[] = this._timeBankokToDBForSearch(
        data.date_time_start
      );

      param.push({
        date_time_start: {
          gte: tempDateTime[0],
          lte: tempDateTime[1],
        },
      });
    }

    // if (data.is_back != "null") {
    //   param.push({
    //     is_back: data.is_back === "true",
    //   });
    // }

    if (data.date_time_back !== "" && data.is_back === "true") {
      const tempDateTime: any[] = this._timeBankokToDBForSearch(
        data.date_time_back
      );
      param.push({
        // OR: [
        //   {
        //     date_time_back: {
        //       lte: this._timeBankokToDB(data.date_time_back),
        //     },
        //   },
        // ],
        date_time_back: {
          gte: tempDateTime[0],
          lte: tempDateTime[1],
        },
      });
    }

    // start all district or only district
    if (Number(data.start_district_id) !== 0) {
      param.push({
        start_district_id: Number(data.start_district_id),
      });
    }
    //  else if (Number(data.start_province_id) !== 0) {
    //   param.push({
    //     start_district: {
    //       province_id: Number(data.start_province_id),
    //     },
    //   });
    // }
    else {
      param.push({
        start_district: { province_id: Number(data.start_province_id) },
      });
    }

    // end all district or only district or region
    if (Number(data.end_district_id) !== 0) {
      param.push({
        // OR: [
        //   {
        //     end_district_id: Number(data.end_district_id),
        //   },
        //   { end_district: { province_id: Number(data.end_province_id) } },
        // ],
        end_district_id: Number(data.end_district_id),
      });
    } else if (Number(data.end_province_id) !== 0) {
      param.push({
        // OR: [
        //   {
        //     end_district: { province_id: Number(data.end_province_id) },
        //   },
        // ],
        end_district: { province_id: Number(data.end_province_id) },
      });
    }

    // if (data.post_id) {
    //   param.push({ id: Number(data.post_id) });
    // }
    // let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty
    let whereData = {};
    if (param.length > 0) {
      whereData = {
        OR: [
          {
            AND: param,
          },
          {
            AND: [
              { created_user_id: userID },
              { OR: [{ status: "NEW" }, { status: "IN_PROGRESS" }] },
            ],
          },
        ],
      };
    } else {
      whereData = {
        AND: [
          { created_user_id: userID },
          { OR: [{ status: "NEW" }, { status: "IN_PROGRESS" }] },
        ],
      };
    }
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

  async findPostsHistory(user_id: number) {
    let posts: any;
    try {
      posts = await this.prisma.posts.findMany({
        orderBy: { id: "desc" },
        where: {
          OR: [
            {
              post_members: { some: { user_id: user_id } },
            },
            { created_user_id: user_id },
          ],
          // post_members: { some: { user_id: user_id } },
        },
        select: {
          id: true,
          name_start: true,
          name_end: true,
          start_district_id: true,
          end_district_id: true,
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

  async findPostByPostID(postID: number) {
    let posts: any;
    try {
      posts = await this.prisma.posts.findFirst({
        where: {
          id: postID,
        },
        select: {
          id: true,
          name_start: true,
          name_end: true,
          start_district_id: true,
          end_district_id: true,
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
    this.prisma.$disconnect();
    return resData;
  }

  private _timeBankokToDB(dateTime: any) {
    let dateTimeFormat = new Date(dateTime);
    dateTimeFormat.setHours(dateTimeFormat.getHours() + 7);
    return dateTimeFormat;
  }

  private _timeBankokToDBForSearch(dateTime: any) {
    let date = new Date(dateTime);
    const datetime1 = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0
    );
    const datetime2 = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59
    );
    datetime1.setHours(datetime1.getHours() + 7);
    datetime2.setHours(datetime2.getHours() + 7);

    return [datetime1, datetime2];
  }
}
