import { ReviewRepository } from "../Repository/ReviewRepository";

export class ReviewFinder {
  private reviewRepository = new ReviewRepository();

  async findReviews(data: any) {
    return await this.reviewRepository.findReviews(data);
  }

  async avgReviews(user_id: number) {
    return await this.reviewRepository.avgReviews(user_id);
  }

  async findMyReviews(userID: number) {
    return await this.reviewRepository.findMyReviews(userID);
  }
}
