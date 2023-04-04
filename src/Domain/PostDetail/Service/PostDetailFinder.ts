import { PostDetailRepository } from "../Repository/PostDetailRepository";

export class PostDetailFinder {
  private districtRepository = new PostDetailRepository();

  async findPostDetails(data: any) {
    const provences = await this.districtRepository.findPostDetails(data);
    return provences;
  }
  async findPostDetailByName(data: any) {
    const provences = await this.districtRepository.findPostDetailByName(data);
    return provences;
  }

  async findPostDetailByProvinceName(data: any) {
    const provences = await this.districtRepository.findPostDetailByProvinceName(
      data
    );
    return provences;
  }
}
