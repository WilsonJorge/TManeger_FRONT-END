// routes.ts

import { Router } from 'express';
import ClientController from '../controller/ClientController'; // Importe o controller

const router = Router();

// Defina as rotas para o CategoryController
router.get('/clients', ClientController.getAll);
router.post('/clients', ClientController.createClient);
router.put('/clients', ClientController.updateClient);
router.delete('/clients', ClientController.deleteCategory)

export default router;