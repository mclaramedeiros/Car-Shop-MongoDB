import { z } from 'zod';
import { zodVehicle } from './IVehicle';

const zodCar = zodVehicle.extend({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

type ICar = z.infer<typeof zodCar>;
export { zodCar, ICar };
