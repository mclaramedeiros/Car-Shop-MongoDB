import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../erros/catalog';
import { ICar } from '../../../interfaces/ICar';
import carModel from '../../../models/carModel';
import CarService from '../../../services/carService';

const mockCar = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
};

const mockCarWithId: ICar & { _id: string } = {
  _id: '632390e57104dcc1221224d9',
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  doorsQty: 2,
  seatsQty: 2,
};

const mockListCars = [
  {
    _id: '6323a030226f962810326f26',
    model: 'Ferrari Maranello',
    year: 1963,
    color: 'red',
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
  },
];

describe('Car Service', () => {
  const car = new carModel();
  const carService = new CarService(car);

  beforeEach(() => {
    sinon.stub(car, 'create').resolves(mockCarWithId);
    sinon.stub(car, 'read').resolves([mockCarWithId]);
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should create a car', async () => {
    const result = await carService.create(mockCar);
    expect(result).to.be.equal(mockCarWithId);
  });
  it('does it returns an error', async () => {
    let error;
    try {
      await carService.create({} as ICar);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.instanceOf(ZodError);
  });

  it('should return a list of cars', async () => {
    sinon.stub(car, 'readOne').resolves(mockCarWithId);
    const serv = await carService.readOne(mockCarWithId._id);
    expect(serv).to.be.deep.equal(mockCarWithId);
  });
  it('it returns an error', async () => {
    sinon.stub(car, 'readOne').resolves(null);
    let error;
    try {
      await carService.readOne(mockCarWithId._id);
    } catch (err: any) {
      error = err;
    }
    expect(error, 'error should be defined').not.to.be.undefined;
    expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
  });

  it('should delete a car', async () => {
    sinon.stub(car, 'delete').resolves(mockCarWithId);
    const serv = await carService.delete(mockCarWithId._id);
    expect(serv).to.be.deep.equal(mockCarWithId);
  });
  it('returns an error', async () => {
    sinon.stub(car, 'delete').resolves(null);
    let error;
    try {
      await carService.delete(mockCarWithId._id);
    } catch (err: any) {
      error = err;
    }
    expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
  });
});
