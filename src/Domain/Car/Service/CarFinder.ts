import { CarRepository } from "../Repository/CarRepository";

export class CarFinder {
  private CarRepository = new CarRepository();

  async findCars(data: any) {
    const cars = await this.CarRepository.findCars(data);
    return cars;
  }
}
