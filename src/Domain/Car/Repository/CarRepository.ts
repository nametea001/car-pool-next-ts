import { PrismaClient } from "@prisma/client";
export class CarRepository {
  private prisma = new PrismaClient();

  async carInsert(data: any) {
    let resData: any = null;

    try {
      resData = await this.prisma.cars.create({
        data: data,
        select: {
          id: true,
          brand: true,
          model: true,
          vehicle_registration: true,
          color: true,
        },
      });
    } catch (err) {
      console.log(err);
      resData = null;
    }
    return resData;
  }

  async carUpdate(whereData: any, data: any) {
    let resData: any = null;
    try {
      resData = await this.prisma.cars.update({
        where: whereData,
        data: data,
        select: {
          id: true,
          brand: true,
          model: true,
          vehicle_registration: true,
          color: true,
        },
      });
    } catch (err) {
      resData = null;
    }
    return resData;
  }

  async carDelete(whereData: any) {
    let resData: any = null;
    try {
      resData = await this.prisma.cars.delete({
        where: whereData,
      });
    } catch (err) {
      resData = null;
    }
    return resData;
  }

  async findCars(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.user_id) {
      param.push({ user_id: parseInt(data.user_id) });
    }
    // if (data.username) {
    //   param.push({ username: data.username.toString() });
    // }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let user: any;
    try {
      user = await this.prisma.cars.findMany({
        where: whereData,
        select: {
          id: true,
          user_id: true,
          brand: true,
          model: true,
          vehicle_registration: true,
          color: true,
        },
      });
    } catch (err) {
      user = null;
    }
    this.prisma.$disconnect();
    return user;
  }
}
