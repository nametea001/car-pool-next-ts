import { ProvinceRepository } from "../Repository/ProvinceRepository";

export class  Finder {
  private thaiProvinceRepository = new ProvinceRepository();

  async findProvinces(data: any) {
    const provinces = await this.thaiProvinceRepository.findProvinces(data);
    return provinces;
  }
}
