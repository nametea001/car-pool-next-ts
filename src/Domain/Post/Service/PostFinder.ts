import { PostRepository } from "../Repository/PostRepository";

export class PostFinder {
  private thaiPostRepository = new PostRepository();

  findPosts(data: any) {
    const posts = this.thaiPostRepository.findPosts(data);
    return posts;
  }
}
