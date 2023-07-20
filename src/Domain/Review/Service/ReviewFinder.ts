import { ReviewRepository } from "../Repository/ReviewRepository";

export class ReviewFinder {
  private reviewRepository = new ReviewRepository();

  async findReviews(data: any) {
    const reviews = await this.reviewRepository.findReviews(data);
    return reviews;
  }

  async avgReviews(user_id: number) {
    const avgReviews = await this.reviewRepository.avgReviews(user_id);
    return avgReviews;
  }
}
