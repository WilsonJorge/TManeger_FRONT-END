// routes.ts

import { Router } from 'express';
import DepartamentController from '../controller/DepartamentController'; // Importe o controller

const router = Router();

// Defina as rotas para o CategoryController
router.get('/departaments', DepartamentController.getAll);
router.post('/departaments', DepartamentController.createDepartament);
router.put('/departaments', DepartamentController.updateDepartament);
router.delete('/departaments', DepartamentController.deleteDepartament);

export default router;
