import { DistrictRepository } from "../Repository/DistrictRepository";

export class DistrictFinder {
  private districtRepository = new DistrictRepository();

  async findDistricts(data: any) {
    const provences = await this.districtRepository.findDistricts(data);
    return provences;
  }
  async findDistrictByName(name: string) {
    const provences = await this.districtRepository.findDistrictByName(name);
    return provences;
  }

  async findDistrictByProvinceName(name: string) {
    const provences = await this.districtRepository.findDistrictByProvinceName(
      name
    );
    return provences;
  }
}
