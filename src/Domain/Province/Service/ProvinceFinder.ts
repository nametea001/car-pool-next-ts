import { ProvinceRepository } from "../Repository/ProvinceRepository";

export class ProvinceFinder {
  private provinceRepository = new ProvinceRepository();

  async findProvinces(data: any) {
    const provinces = await this.provinceRepository.findProvinces(data);
    return provinces;
  }
}
