// src/services/CategoryService.ts

import { getRepository } from 'typeorm';
import { Client } from '../entity/Client';

class CategoryService {
  private clienteRepository = getRepository(Client);

  async getAllClients() {
    return this.clienteRepository.find();
  }

  async createCategory(clientData: Partial<Client>) {
    const newClient = this.clienteRepository.create(clientData);
    await this.clienteRepository.save(newClient);
    return newClient;
  }
}

export default new CategoryService();
