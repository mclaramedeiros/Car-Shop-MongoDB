import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { ICar } from '../../../interfaces/ICar';
import carModel from '../../../models/carModel';
import { Model } from 'mongoose';

const mockCar = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
};

const mockCarUpdate = {
  model: 'Ferrari Maranello',
  year: 1940,
  color: 'red',
  buyValue: 3500,
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
  {
    _id: '6323a046226f962810326f28',
    model: 'Fiat',
    year: 1900,
    color: 'black',
    buyValue: 35000,
    doorsQty: 3,
    seatsQty: 3,
  },
  {
    _id: '6323a05a226f962810326f2a',
    model: 'Gol',
    year: 1950,
    color: 'blue',
    buyValue: 35000,
    doorsQty: 4,
    seatsQty: 4,
  },
];

const invalidId = 'id Inválido';
const validId = '632390e57104dcc1221224d9';
const mongoId = 'InvalidMongoId';

describe('Testes de unidade do model', () => {
  const car = new carModel();

  beforeEach(() => {
    sinon.stub(Model, 'create').resolves(mockCarWithId);
    sinon.stub(Model, 'findOne').resolves(mockCarWithId);
    sinon.stub(Model, 'find').resolves(mockListCars);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(mockCarUpdate);
    sinon.stub(Model, 'findByIdAndDelete').resolves('removed');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('create', async () => {
    const newCar = await car.create(mockCar);
    expect(newCar).to.be.deep.equal(mockCarWithId);
  });
  it('read', async () => {
    const listCars = await car.read();
    expect(listCars).to.be.deep.equal(mockListCars);
  });
  it('readOne', async () => {
    const newCar = await car.readOne(validId);
    expect(newCar).to.be.deep.equal(mockCarWithId);
  });
  it('update', async () => {
    const newCar = await car.update(validId, mockCarUpdate);
    expect(newCar).to.be.deep.equal(mockCarUpdate);
  });
  it('delete', async () => {
    const newCar = await car.delete(validId);
    expect(newCar).to.be.deep.equal('removed');
  })
});
