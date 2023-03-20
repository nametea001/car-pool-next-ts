import { ThaiProvinceRepository } from "../Repository/ThaiProvenceRepository";

export class ThaiProvinceFinder {
  private thaiProvinceRepository = new ThaiProvinceRepository();

  findThaiProvinces(data: any) {
    const provinces = this.thaiProvinceRepository.findProvinces(data);
    return provinces;
  }
}
