import { IModel } from '../interfaces/IModel';
import { ICar, zodCar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = zodCar.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    const data = await this._car.read();
    return data;
  }
}

export default CarService;
