import { CarRepository } from "../Repository/CarRepository";

export class CarFinder {
  private CarRepository = new CarRepository();

  findCars(data: any) {
    const cars = this.CarRepository.findCars(data);
    return cars;
  }
}
