import { IModel } from '../interfaces/IModel';
import { ICar, zodCar } from '../interfaces/ICar';
import IService from '../interfaces/IService';
import { ErrorTypes } from '../erros/catalog';

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
  public async readOne(_id: string): Promise<ICar> {
    const data = await this._car.readOne(_id);
    if (!data) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return data;
  }
  public async update(_id: string, obj: ICar): Promise<ICar> {
    const parsed = zodCar.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const data = await this._car.update(_id, obj);
    if (!data) {
      throw Error(ErrorTypes.EntityNotFound);
    }
    return data;
  }
  public async delete(_id: string): Promise<ICar> {
    const data = await this._car.delete(_id);
    if (!data) {
      throw Error(ErrorTypes.EntityNotFound);
    }
    return data;
  }
}

export default CarService;
