import { ThaiAumphureRepository } from "../Repository/ThaiAumphureRepository";

export class ThaiAumphureFinder {
  private thaiProvenceRepository = new ThaiAumphureRepository();

  async findAumphures(data: any) {
    const provences = await this.thaiProvenceRepository.findAumphures(data);
    return provences;
  }
}
