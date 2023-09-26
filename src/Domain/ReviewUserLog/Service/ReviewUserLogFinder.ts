import { ReviewUserLogRepository } from "../Repository/ReviewUserLogRepository";

export class ReviewUserLogFinder {
  private reviewUserLogRepository = new ReviewUserLogRepository();

  async findReviewUserLogs(userID: number) {
    return await this.reviewUserLogRepository.findReviewUserLogs(userID);
  }

  async countReviewUserLogs(userID: number) {
    return await this.reviewUserLogRepository.countReviewUserLogs(userID);
  }
}
