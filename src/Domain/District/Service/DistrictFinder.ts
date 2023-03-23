import { DistrictRepository } from "../Repository/DistrictRepository";

export class DistrictFinder {
  private districtRepository = new DistrictRepository();

  async findDistricts(data: any) {
    const provences = await this.districtRepository.findDistricts(data);
    return provences;
  }
}
