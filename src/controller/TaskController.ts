import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Task } from '../entity/Task';

class TaskController {
  async getAll(req: Request, res: Response) {
    try {
      const taskRepository = getRepository(Task);
      const tasks = await taskRepository.find();
      return res.json(tasks);
    } catch (error) {
      console.error('Erro ao buscar Tarefas:', error);
      return res.status(500).json({ error: 'Falha ao buscar Tarefas' });
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      console.log('Corpo da solicitação:', req); // Adicione esta linha para registrar o corpo da solicitação
      const taskRepository = getRepository(Task);
      const newTask = taskRepository.create(req.body);
      console.log('Nova tarefa a ser criada:', newTask); // Adicione esta linha para registrar a nova categoria
      await taskRepository.save(newTask);
      console.log('Tarefa criada com sucesso:', newTask); // Adicione esta linha para registrar a categoria criada
      return res.status(201).json(newTask);
    } catch (error) {
      console.error('Erro ao criar um Tarefa:', error);
      return res.status(500).json({ error: 'Falha ao criar uma Tarefa,Tente Novamente', reason: error.message });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const taskRepository = getRepository(Task);
      const taskId: number = +req.params.id; // Certifique-se de que taskId é do tipo correto (neste caso, número).
      // Verifique se o ID da Tarefa foi fornecido
      if (!taskId) {
        return res.status(400).json({ error: 'ID da Tarefa não fornecida' });
      }
  
      // Busque a categoria no banco de dados
      const existingTask = await taskRepository.findOne({
        where: { id: taskId }
      });

      // Verifique se a Tarefa existe
      if (!existingTask) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
  
      // Atualize o projecto com os novos dados do corpo da solicitação
      const { title, startDate,  endDate,  assignTo, Description, taskStatus, priority, filePath, category, project} = req.body;
      existingTask.title = title;
      existingTask.startDate = startDate;
      existingTask.endDate=endDate;
      existingTask.assignTo= assignTo;
      existingTask.Description = Description;
      existingTask.taskStatus= taskStatus;
      existingTask.priority=priority;
      existingTask.filePath=filePath;
      existingTask.category=category;
      existingTask.project=project;
  
      // Salve as alterações no banco de dados
      await taskRepository.save(existingTask);
  
      return res.json(existingTask);
    } catch (error) {
      console.error('Erro ao atualizar Tarefa:', error);
      return res.status(500).json({ error: 'Falha ao atualizar projecto', reason: error.message });
    }
  }
  async deleteProject(req: Request, res: Response) {
    try {
      const taskRepository = getRepository(Task);
      const tasktId = req.params.id;
  
      // Verifique se o ID da categoria foi fornecido
      if (!tasktId) {
        return res.status(400).json({ error: 'ID da Tarefa não fornecido' });
      }
  
      // Busque a categoria no banco de dados
      const existingTask = await taskRepository.findOne({
        where: { id: parseInt(tasktId, 10) }
      });

      // Verifique se a categoria existe
      if (!existingTask) {
        return res.status(404).json({ error: 'Tarefa não encontrado' });
      }
  
      // Remova a categoria do banco de dados
      await taskRepository.remove(existingTask);
  
      return res.json({ message: 'Tarefa removida com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir Tarefa:', error);
      return res.status(500).json({ error: 'Falha ao excluir tarefa', reason: error.message });
    }
  }

}

export default new TaskController();

