import { PostMemberRepository } from "../Repository/PostMemberRepository";

export class PostMemberFinder {
  private postDetailRepository = new PostMemberRepository();

  async findPostMembers(data: any) {
    const postDetails = await this.postDetailRepository.findPostMembers(data);
    return postDetails;
  }
  async findPostMemberByPostID(data: any) {
    const postDetails = await this.postDetailRepository.findPostMemberByPostID(
      data
    );
    return postDetails;
  }
}
