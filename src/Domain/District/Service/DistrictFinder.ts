import { ThaiDistrictRepository } from "../Repository/DistrictRepository";

export class ThaiDistrictFinder {
  private thaiProvenceRepository = new ThaiDistrictRepository();

  async findDistricts(data: any) {
    const provences = await this.thaiProvenceRepository.findDistricts(data);
    return provences;
  }
}
