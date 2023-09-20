import { ReviewUserLogRepository } from "../Repository/ReviewUserLogRepository";

export class ReviewUserLogFinder {
  private reviewUserLogRepository = new ReviewUserLogRepository();

  async findReviewUserLogs(data: any) {
    const reviewUserLogs =
      await this.reviewUserLogRepository.findReviewUserLogs(data);
    return reviewUserLogs;
  }
}
