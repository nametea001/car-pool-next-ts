import { PostRepository } from "../Repository/PostRepository";

export class PostFinder {
  private PostRepository = new PostRepository();

  async findPosts(data: any) {
    const posts = await this.PostRepository.findPosts(data);
    return posts;
  }
  async findStatusPostByID(postID: number) {
    const post = await this.PostRepository.findStatusPostByID(postID);
    return post;
  }
}
