import { PostRepository } from "../Repository/PostRepository";

export class PostFinder {
  private PostRepository = new PostRepository();

  async findPosts(data: any, userID: number) {
    return await this.PostRepository.findPosts(data, userID);
  }

  async findPostsHistory(user_id: number) {
    const posts = await this.PostRepository.findPostsHistory(user_id);
    return posts;
  }

  async findStatusPostByID(postID: number) {
    const post = await this.PostRepository.findStatusPostByID(postID);
    return post;
  }

  async findPostByPostID(postID: number) {
    const post = await this.PostRepository.findPostByPostID(postID);
    return post;
  }
}
