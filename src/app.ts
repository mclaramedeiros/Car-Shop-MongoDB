import express from 'express';
import 'express-async-errors';
import carRoutes from './routes/carRoute';
import erro from './middlewares/error';

const app = express();
app.use(express.json());

app.use(carRoutes);
app.use(erro);

export default app;
