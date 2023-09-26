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
          post_id: true,
        },
      });
    } catch (err) {
      postMember = null;
    }
    this.prisma.$disconnect();
    return postMember;
  }

  async findPostMembersByPostIDAndNotOwner(data: any) {
    let postMember: any;
    try {
      postMember = await this.prisma.post_members.findMany({
        where: {
          AND: {
            post_id: data.post_id,
            NOT: {
              user_id: data.user_id,
            },
          },
        },
        select: {
          user_id: true,
        },
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
              status: true,
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

  async findPostMemberForPostDetail(postID: number) {
    let postMember: any;
    try {
      postMember = await this.prisma.post_members.findMany({
        where: { post_id: postID },
        select: {
          id: true,
          post_id: true,
          user_id: true,
          users: {
            select: {
              img_path: true,
              first_name: true,
              last_name: true,
              email: true,
              sex: true,
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
