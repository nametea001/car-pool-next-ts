import { PostDetailRepository } from "../Repository/PostDetailRepository";

export class PostDetailFinder {
  private postDetailRepository = new PostDetailRepository();

  async findPostDetails(data: any) {
    const postDetails = await this.postDetailRepository.findPostDetails(data);
    return postDetails;
  }
  async findPostDetailByPostID(data: any) {
    const postDetails = await this.postDetailRepository.findPostDetailByPostID(
      data
    );
    return postDetails;
  }
}
