import { PostRepository } from "../Repository/PostRepository";

export class PostFinder {
  private thaiPostRepository = new PostRepository();

  async findPosts(data: any) {
    const posts = await this.thaiPostRepository.findPosts(data);
    return posts;
  }
}
