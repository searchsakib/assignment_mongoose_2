import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRouter from './app/modules/products/products.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Whiteness');
});

app.use('/api/products', productRouter);

export default app;
