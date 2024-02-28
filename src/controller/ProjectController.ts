import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Project } from '../entity/Project';

class ProjectController {
  async getAll(req: Request, res: Response) {
    try {
      const projectRepository = getRepository(Project);
      const projects = await projectRepository.find();
      return res.json(projects);
    } catch (error) {
      console.error('Erro ao buscar Projecto:', error);
      return res.status(500).json({ error: 'Falha ao buscar Projectos' });
    }
  }

  async createProject(req: Request, res: Response) {
    try {
      console.log('Corpo da solicitação:', req); // Adicione esta linha para registrar o corpo da solicitação
      const projectRepository = getRepository(Project);
      const newProject = projectRepository.create(req.body);
      console.log('Novo projecto a ser criado:', newProject); // Adicione esta linha para registrar a nova categoria
      await projectRepository.save(newProject);
      console.log('Projecto criado com sucesso:', newProject); // Adicione esta linha para registrar a categoria criada
      return res.status(201).json(newProject);
    } catch (error) {
      console.error('Erro ao criar um Porjecto:', error);
      return res.status(500).json({ error: 'Falha ao criar um Projecto,Tente Novamente', reason: error.message });
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const projectRepository = getRepository(Project);
      const projectId: number = +req.params.id; // Certifique-se de que categoryId é do tipo correto (neste caso, número).
      // Verifique se o ID da categoria foi fornecido
      if (!projectId) {
        return res.status(400).json({ error: 'ID do Projecto não fornecido' });
      }
  
      // Busque a categoria no banco de dados
      const existingProject = await projectRepository.findOne({
        where: { id: projectId }
      });
      // Verifique se a categoria existe
      if (!existingProject) {
        return res.status(404).json({ error: 'Projecto não encontrada' });
      }
  
      // Atualize o projecto com os novos dados do corpo da solicitação
      const { projectName, startDate,  endDate,  projectCategory, country, telephone, company, companyPhone, city, Andress, tasks } = req.body;
      existingProject.projectName = projectName;
      existingProject.startDate = startDate;
      existingProject.endDate=endDate;
      existingProject.projectCategory= projectCategory;
      existingProject.country = country;
      existingProject.telephone= telephone;
      existingProject.company=company;
      existingProject.companyPhone=companyPhone;
      existingProject.city= city;
      existingProject.Andress=Andress;
      existingProject.tasks=tasks;
  
      // Salve as alterações no banco de dados
      await projectRepository.save(existingProject);
  
      return res.json(existingProject);
    } catch (error) {
      console.error('Erro ao atualizar projecto:', error);
      return res.status(500).json({ error: 'Falha ao atualizar projecto', reason: error.message });
    }
  }
  async deleteProject(req: Request, res: Response) {
    try {
      const projectRepository = getRepository(Project);
      const projectId = req.params.id;
  
      // Verifique se o ID da categoria foi fornecido
      if (!projectId) {
        return res.status(400).json({ error: 'ID do Projecto não fornecido' });
      }
  
      // Busque a categoria no banco de dados
      const existingProject = await projectRepository.findOne({
        where: { id: parseInt(projectId, 10) }
      });

      // Verifique se a categoria existe
      if (!existingProject) {
        return res.status(404).json({ error: 'Projecto não encontrado' });
      }
  
      // Remova a categoria do banco de dados
      await projectRepository.remove(existingProject);
  
      return res.json({ message: 'Projecto removido com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir projecto:', error);
      return res.status(500).json({ error: 'Falha ao excluir projecto', reason: error.message });
    }
  }
  

}

export default new ProjectController();

