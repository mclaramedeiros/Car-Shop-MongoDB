import { isValidObjectId, Model } from 'mongoose';
import { ErrorTypes } from '../erros/catalog';
// UpdateQuery
// isValidObjectId
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T & { _id: string }> {
    const created = await this._model.create({ ...obj });

    return created as T & { _id: string };
    // return {
    //   ...created,
    //   _id: created._id,
    // };
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw Error(ErrorTypes.InvalidMongoId);
    }
    return this._model.findOne({ _id });
  }
}

export default MongoModel;
