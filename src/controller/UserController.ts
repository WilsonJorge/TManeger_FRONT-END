// src/controllers/UserController.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

class UserController{
  async getAll(req: Request, res: Response) {
    try {
      const userRepository = getRepository(User);
      const users = await userRepository.find();
      return res.json(users);
    } catch (error) {
      console.error('Erro ao buscar Users:', error);
      return res.status(500).json({ error: 'Falha ao buscar Users' });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      console.log('Corpo da solicitação:', req); // Adicione esta linha para registrar o corpo da solicitação
      const userRepository = getRepository(User);
      const {firstName,lastName,age} = req.body
      console.log(lastName)
      const newUser = userRepository.create({firstName,lastName,age});
      console.log('Novo user a ser criado:', newUser); // Adicione esta linha para registrar a nova categoria
      await userRepository.save(newUser);
      console.log('User criado com sucesso:', newUser); // Adicione esta linha para registrar a categoria criada
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Erro ao criar um user:', error);
      return res.status(500).json({ error: 'Falha ao criar um user,Tente Novamente', reason: error.message });
    }
  }

}

export default new  UserController();





  
