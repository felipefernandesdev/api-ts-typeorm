import { Router } from 'express';
import { RoomController } from './controller/RoomController';
import { SubjectController } from './controller/SubjectController';

const routes = Router();
routes.post('/subject', new SubjectController().create);
routes.post('/room', new RoomController().create);

export default routes;
