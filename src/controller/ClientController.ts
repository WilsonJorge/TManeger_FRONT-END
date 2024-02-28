
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Client } from '../entity/Client';

class ClientController {
  async getAll(req: Request, res: Response) {
    try {
      const clientRepository = getRepository(Client);
      const clients = await clientRepository.find();
      return res.json(clients);
    } catch (error) {
      console.error('Erro ao buscar Clientes:', error);
      return res.status(500).json({ error: 'Falha ao buscar Clientes' });
    }
  }

  async createClient(req: Request, res: Response) {
    try {
      console.log('Corpo da solicitação:', req); // Adicione esta linha para registrar o corpo da solicitação
      const clientRepository = getRepository(Client);
      const {nome, email, country, telephone, company, companyPhone,  city,  Andress} = req.body
      
      const newClient = clientRepository.create({nome, email, country, telephone, company, companyPhone,  city,  Andress});
      console.log('Novo cliente a ser criado:', newClient); // Adicione esta linha para registrar a nova categoria
      await clientRepository.save(newClient);
      console.log('Cliente criado com sucesso:', newClient); // Adicione esta linha para registrar a categoria criada
      return res.status(201).json(newClient);
    } catch (error) {
      console.error('Erro ao criar um Cliente:', error);
      return res.status(500).json({ error: 'Falha ao criar uma categoria,Tente Novamente', reason: error.message });
    }
  }

  async updateClient(req: Request, res: Response) {
    try {
      const clientRepository = getRepository(Client);
      const clientId: number = +req.params.id; // Certifique-se de que categoryId é do tipo correto (neste caso, número).
      // Verifique se o ID da categoria foi fornecido
      if (!clientId) {
        return res.status(400).json({ error: 'ID do cliente não fornecido' });
      }
  
      // Busque a categoria no banco de dados
      const existingClient = await clientRepository.findOne({
        where: { id: clientId }
      });
      // Verifique se a categoria existe
      if (!existingClient) {
        return res.status(404).json({ error: 'Cliente não encontrada' });
      }
  
      // Atualize a categoria com os novos dados do corpo da solicitação
      const {nome, email, country, telephone, company, companyPhone,  city,  Andress  } = req.body;
      existingClient.nome = nome;
      existingClient.email = email;
      existingClient.country= country;
      existingClient.telephone=telephone;
      existingClient.company= company;
      existingClient.companyPhone=companyPhone;
      existingClient.city=city;
      existingClient.Andress=Andress;
  
      // Salve as alterações no banco de dados
      await clientRepository.save(existingClient);
  
      return res.json(existingClient);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      return res.status(500).json({ error: 'Falha ao atualizar cliente', reason: error.message });
    }
  }
  async deleteCategory(req: Request, res: Response) {
    try {
      const clientRepository = getRepository(Client);
      const clientId = req.params.id;
  
      // Verifique se o ID da categoria foi fornecido
      if (!clientId) {
        return res.status(400).json({ error: 'ID do Cliente não fornecido' });
      }
  
      // Busque a categoria no banco de dados
      const existingClient = await clientRepository.findOne({
        where: { id: parseInt(clientId, 10) }
      });

      // Verifique se a categoria existe
      if (!existingClient) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
  
      // Remova a categoria do banco de dados
      await clientRepository.remove(existingClient);
  
      return res.json({ message: 'Cliente removido com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      return res.status(500).json({ error: 'Falha ao excluir cliente', reason: error.message });
    }
  }
  

}

export default new ClientController();

