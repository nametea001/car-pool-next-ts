import { ThaiProvinceRepository } from "../Repository/ThaiProvenceRepository";

export class ThaiProvinceFinder {
  private thaiProvinceRepository = new ThaiProvinceRepository();

  async findThaiProvinces(data: any) {
    const provinces =  await this.thaiProvinceRepository.findProvinces(data);
    return provinces;
  }
}
