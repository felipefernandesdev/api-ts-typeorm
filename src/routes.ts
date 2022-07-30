import { Router } from 'express';
import { SubjectController } from './controller/SubjectController';

const routes = Router();
routes.post('/subject', new SubjectController().create);

export default routes;
