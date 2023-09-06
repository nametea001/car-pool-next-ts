import { PostMemberRepository } from "../Repository/PostMemberRepository";

export class PostMemberFinder {
  private postDetailRepository = new PostMemberRepository();

  async findPostMembersByPostID(postID: number) {
    return await this.postDetailRepository.findPostMembersByPostID(postID);
  }
  async findPostMemberForCheckJoin(data: any) {
    const postDetails =
      await this.postDetailRepository.findPostMemberForCheckJoin(data);
    return postDetails;
  }
}
