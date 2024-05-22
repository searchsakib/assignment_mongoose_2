import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRouter from './app/modules/products/products.route';
import orderRouter from './app/modules/orders/orders.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Whiteness');
});

// app routes
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// Not Found Route for all methods - Should be the last route definition
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
