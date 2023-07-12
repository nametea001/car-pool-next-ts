import { PrismaClient } from "@prisma/client";

export class PostMemberRepository {
  private prisma = new PrismaClient();

  async postMemberInsert(data: any) {
    let postMember: any;
    try {
      postMember = this.prisma.post_members.create({
        data: data,
        select: {
          id: true,
        },
      });
      return postMember;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findPostMembers(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.postMember_id) {
      param.push({ id: parseInt(data.postMember_id) });
    }
    if (data.name_en) {
      param.push({ name_en: data.name_en });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let postMember: any;
    try {
      postMember = await this.prisma.post_members.findMany({
        where: whereData,
        select: {},
      });
    } catch (err) {
      postMember = null;
    }
    this.prisma.$disconnect();
    return postMember;
  }

  async findPostMemberForCheckJoin(data: any) {
    let postMember: any;
    try {
      postMember = await this.prisma.post_members.findMany({
        // where: {
        //   AND: {
        //     post_id: data.post_id,
        //     NOT: {
        //       user_id: data.user_id,
        //     },
        //   },
        // },
        where: data,
        select: {
          id: true,
          post_id: true,
          user_id: true,
          posts: {
            select: {
              post_details: {
                select: {
                  seat: true,
                },
              },
            },
          },
        },
      });
    } catch (err) {
      postMember = null;
    }
    this.prisma.$disconnect();
    return postMember;
  }
}
