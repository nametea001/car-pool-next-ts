import { PostRepository } from "../Repository/PostRepository";
import { PostDetailUpdater } from "../../PostDetail/Service/PostDetailUpdater";

export class PostUpdater {
  private postReposotory = new PostRepository();

  async addPostAndPostDetail(data: any, updateBy: number) {
    const postDetailForPost = new PostDetailUpdater();
    let post: any = null;
    const rowPost = this.MapToRow(data, updateBy, true);
    const rowPosDetail = postDetailForPost.MapToRow(data, updateBy, true);
    post = await this.postReposotory.addPostAndPostDetail(
      rowPost,
      rowPosDetail
    );
    return post;
  }

  async updatePosts(whereData: any, dataPost: any, user_id: number) {
    const row = this.MapToRow(dataPost, user_id);
    let posts = await this.postReposotory.updatePosts(whereData, row);
    return posts;
  }

  // map to DB
  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("name_start" in data) {
      result.name_start = data.name_start;
    }
    if ("name_end" in data) {
      result.name_end = data.name_end;
    }
    if ("start_district_id" in data) {
      result.start_district_id = data.start_district_id;
    }
    if ("end_district_id" in data) {
      result.end_district_id = data.end_district_id;
    }
    if ("is_back" in data) {
      result.is_back = data.is_back;
    }
    if ("date_time_start" in data) {
      result.date_time_start = data.date_time_start;
    }
    if ("date_time_back" in data) {
      result.date_time_back = data.date_time_back;
    }
    if ("status" in data) {
      result.status = data.status;
    }

    if (Object.keys(result).length !== 0) {
      let dataTime = new Date();
      dataTime.setHours(dataTime.getHours() + 7);
      if (create) {
        result.created_at = dataTime;
        result.created_user_id = updateBy;
      }
      result.updated_at = dataTime;
      result.updated_user_id = updateBy;
    }
    return result;
  }
}
