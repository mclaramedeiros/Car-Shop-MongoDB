import express from 'express';
import carRoutes from './routes/carRoute';

const app = express();
app.use(express.json());

app.use('/cars', carRoutes);

export default app;
