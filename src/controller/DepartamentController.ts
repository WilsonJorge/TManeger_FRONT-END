// src/controllers/DepartamentController.ts

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Departament } from '../entity/Departament';

class DepartamentController {
  async getAll(req: Request, res: Response) {
    try {
      const departamentRepository = getRepository(Departament);
      const departaments = await departamentRepository.find();
      return res.json(departaments);
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao buscar departamentos' });
    }
  }

  async createDepartament(req: Request, res: Response) {
    try {
      const departamentRepository = getRepository(Departament);
      const newDepartament = departamentRepository.create(req.body);
      await departamentRepository.save(newDepartament);
      return res.status(201).json(newDepartament);
    } catch (error) {
      console.error("Erro ao criar uma Departamento:", error);
      return res.status(500).json({ error: 'Falha ao criar uma Departamento', reason: error.message });
  }
}
 
async updateDepartament(req: Request, res: Response) {
  try {
    const departamentRepository = getRepository(Departament);
    const departamentId: number = +req.params.id; // Certifique-se de que departamentId é do tipo correto (neste caso, número).
    // Verifique se o ID do Departamento foi fornecido
    if (!departamentId) {
      return res.status(400).json({ error: 'ID do Departamento não fornecido' });
    }

    // Busque o Departamento no banco de dados
    const existingDepartament = await departamentRepository.findOne({
      where: { id: departamentId }
    });
    // Verifique se o departamento existe
    if (!existingDepartament) {
      return res.status(404).json({ error: 'Departamento não encontrada' });
    }

    // Atualize o Departamento com os novos dados do corpo da solicitação
    const { departamento, numeroColaboradores } = req.body;
    existingDepartament.departamento = departamento;
    existingDepartament.numeroColaboradores = numeroColaboradores;

    // Salve as alterações no banco de dados
    await departamentRepository.save(existingDepartament);

    return res.json(existingDepartament);
  } catch (error) {
    console.error('Erro ao atualizar Departamento:', error);
    return res.status(500).json({ error: 'Falha ao atualizar Departamento', reason: error.message });
  }
}

async deleteDepartament(req: Request, res: Response) {
  try {
    const departamentRepository = getRepository(Departament);
    const departamentId = req.params.id;

    // Verifique se o ID do Departamento foi fornecido
    if (!departamentId) {
      return res.status(400).json({ error: 'ID do Departamento não fornecido' });
    }

    // Busque o Departamento no banco de dados
    const existingDepartament = await departamentRepository.findOne({
      where: { id: parseInt(departamentId, 10) }
    });

    // Verifique se o departamento existe
    if (!existingDepartament) {
      return res.status(404).json({ error: 'Departamento não encontrada' });
    }

    // Remova a departamento do banco de dados
    await departamentRepository.remove(existingDepartament);

    return res.json({ message: 'Departamento  removido com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir departamento:', error);
    return res.status(500).json({ error: 'Falha ao excluir departamento', reason: error.message });
  }
}


}

export default new DepartamentController();
