import { ThaiAumphureRepository } from "../Repository/ThaiAumphureRepository";

export class ThaiAumphureFinder {
  private thaiProvenceRepository = new ThaiAumphureRepository();

  findAumphures(data: any) {
    const provences = this.thaiProvenceRepository.findAumphures(data);
    return provences;
  }
}
