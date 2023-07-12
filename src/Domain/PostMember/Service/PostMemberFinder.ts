import { PostMemberRepository } from "../Repository/PostMemberRepository";

export class PostMemberFinder {
  private postDetailRepository = new PostMemberRepository();

  async findPostMembers(data: any) {
    const postDetails = await this.postDetailRepository.findPostMembers(data);
    return postDetails;
  }
  async findPostMemberForCheckJoin(data: any) {
    const postDetails =
      await this.postDetailRepository.findPostMemberForCheckJoin(data);
    return postDetails;
  }
}
