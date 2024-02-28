// routes.ts

import { Router } from 'express';
import ProjectController from '../controller/ProjectController';

const router = Router();

// Defina as rotas para o CategoryController
router.get('/projects', ProjectController.getAll);
router.post('/projects',ProjectController.createProject);
router.put('/projects', ProjectController.updateProject);
router.put('/projects', ProjectController.deleteProject);
export default router;