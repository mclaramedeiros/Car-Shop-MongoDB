import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const CarSchema = new Schema<ICar>(
  {
    model: String,
    year: Number,
    color: String,
    status: String,
    buyValue: Number,
    doorsQty: Number,
    seatsQty: Number,
  },
  { versionKey: false },
);

class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', CarSchema)) {
    super(model);
  }
}

export default CarModel;
