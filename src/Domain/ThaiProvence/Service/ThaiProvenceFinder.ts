import { ThaiProvenceRepository } from "../Repository/ThaiProvenceRepository";

export class ThaiProvenceFinder {
  private thaiProvenceRepository = new ThaiProvenceRepository();

  findThaiProvences(data: any) {
    const provences = this.thaiProvenceRepository.findProvences(data);
    return provences;
  }
}
