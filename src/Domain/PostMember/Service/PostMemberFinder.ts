import { PostMemberRepository } from "../Repository/PostMemberRepository";

export class PostMemberFinder {
  private postDetailRepository = new PostMemberRepository();

  async findPostMembersByPostIDAndNotOwner(data: any) {
    return await this.postDetailRepository.findPostMembersByPostIDAndNotOwner(
      data
    );
  }

  async findPostMemberForCheckJoin(data: any) {
    return await this.postDetailRepository.findPostMemberForCheckJoin(data);
  }

  async findPostMemberForPostDetail(postID: number) {
    return await this.postDetailRepository.findPostMemberForPostDetail(postID);
  }
}
