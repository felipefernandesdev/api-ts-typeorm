import express, { Request, Response } from 'express';
import { AppDataSource } from './data-source';

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.get('/', (request: Request, response: Response) => {
    return response.json('tudo ok aqui');
  });

  return app.listen(process.env.PORT, () => console.log('API is running'));
});
