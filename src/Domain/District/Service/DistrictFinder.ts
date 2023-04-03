import { DistrictRepository } from "../Repository/DistrictRepository";

export class DistrictFinder {
  private districtRepository = new DistrictRepository();

  async findDistricts(data: any) {
    const provences = await this.districtRepository.findDistricts(data);
    return provences;
  }
  async findDistrictByName(data: any) {
    const provences = await this.districtRepository.findDistrictByName(data);
    return provences;
  }

  async findDistrictByProvinceName(data: any) {
    const provences = await this.districtRepository.findDistrictByProvinceName(
      data
    );
    return provences;
  }
}
