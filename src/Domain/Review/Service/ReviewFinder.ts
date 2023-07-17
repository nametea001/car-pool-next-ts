import { ReviewRepository } from "../Repository/ReviewRepository";

export class ReviewFinder {
  private reviewRepository = new ReviewRepository();

  async findReviews(data: any) {
    const reviews = await this.reviewRepository.findReviews(data);
    return reviews;
  }

}
