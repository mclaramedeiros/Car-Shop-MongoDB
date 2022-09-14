import { IModel } from '../interfaces/IModel';
import { ICar } from '../interfaces/ICar';

class CarService implements IModel<ICar> {
  private _frame: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._frame = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = FrameZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._frame.create(obj);
  }
}
