// src/controllers/CategoryController.ts

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';

class CategoryController {
  async getAll(req: Request, res: Response) {
    try {
      const categoryRepository = getRepository(Category);
      const categories = await categoryRepository.find();
      return res.json(categories);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      return res.status(500).json({ error: 'Falha ao buscar categorias' });
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      console.log('Corpo da solicitação:', req); // Adicione esta linha para registrar o corpo da solicitação
      const categoryRepository = getRepository(Category);
      const {categoria,numeroCategoria} = req.body
      console.log(categoria)
      const newCategory = categoryRepository.create({categoria,numeroCategoria});
      console.log('Nova categoria a ser criada:', newCategory); // Adicione esta linha para registrar a nova categoria
      await categoryRepository.save(newCategory);
      console.log('Categoria criada com sucesso:', newCategory); // Adicione esta linha para registrar a categoria criada
      return res.status(201).json(newCategory);
    } catch (error) {
      console.error('Erro ao criar uma categoria:', error);
      return res.status(500).json({ error: 'Falha ao criar uma categoria,Tente Novamente', reason: error.message });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const categoryRepository = getRepository(Category);
      const categoryId: number = +req.params.id; // Certifique-se de que categoryId é do tipo correto (neste caso, número).
      // Verifique se o ID da categoria foi fornecido
      if (!categoryId) {
        return res.status(400).json({ error: 'ID da categoria não fornecido' });
      }
  
      // Busque a categoria no banco de dados
      const existingCategory = await categoryRepository.findOne({
        where: { id: categoryId }
      });
      // Verifique se a categoria existe
      if (!existingCategory) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
  
      // Atualize a categoria com os novos dados do corpo da solicitação
      const { categoria, numeroCategoria } = req.body;
      existingCategory.categoria = categoria;
      existingCategory.numeroCategoria = numeroCategoria;
  
      // Salve as alterações no banco de dados
      await categoryRepository.save(existingCategory);
  
      return res.json(existingCategory);
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      return res.status(500).json({ error: 'Falha ao atualizar categoria', reason: error.message });
    }
  }
  async deleteCategory(req: Request, res: Response) {
    try {
      const categoryRepository = getRepository(Category);
      const categoryId = req.params.id;
  
      // Verifique se o ID da categoria foi fornecido
      if (!categoryId) {
        return res.status(400).json({ error: 'ID da categoria não fornecido' });
      }
  
      // Busque a categoria no banco de dados
      const existingCategory = await categoryRepository.findOne({
        where: { id: parseInt(categoryId, 10) }
      });

      // Verifique se a categoria existe
      if (!existingCategory) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
  
      // Remova a categoria do banco de dados
      await categoryRepository.remove(existingCategory);
  
      return res.json({ message: 'Categoria removida com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      return res.status(500).json({ error: 'Falha ao excluir categoria', reason: error.message });
    }
  }
  

}

export default new CategoryController();

