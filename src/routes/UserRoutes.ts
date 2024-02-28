import { Router } from 'express';
import UserController from '../controller/UserController'; // Importe o controller

const router = Router();

// Defina as rotas para o CategoryController
router.get('/users', UserController.getAll);
router.post('/users', UserController.createUser);

export default router;
