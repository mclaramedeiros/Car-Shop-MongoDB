import { Router } from 'express';
// import  from '../controllers/carController';
import CarController from '../controllers/carController';
import CarService from '../services/carService';
import CarModel from '../models/carModel';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars', (req, res) => carController.read(req, res));
route.get('/cars/:id', (req, res) => carController.readOne(req, res));

export default route;
