import { Router } from 'express';
import { CarController } from '../controllers/carController';

const route = Router();

route.post('/cars', (req, res) => CarController.create(req, res));

export default route;
