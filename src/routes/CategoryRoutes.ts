// routes.ts

import { Router } from 'express';
import CategoryController from '../controller/CategoryController'; // Importe o controller

const router = Router();

// Defina as rotas para o CategoryController
router.get('/categories', CategoryController.getAll);
router.post('/categories', CategoryController.createCategory);
router.put('/categories', CategoryController.updateCategory);
router.delete('/categories', CategoryController.deleteCategory)
export default router;
