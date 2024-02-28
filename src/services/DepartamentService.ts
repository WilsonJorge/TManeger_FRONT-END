// src/services/DepartamentService.ts

import { getRepository } from 'typeorm';
import { Departament } from '../entity/Departament';

class DepartamentService {
  private departamentRepository = getRepository(Departament);

  async getAllDepartaments() {
    return this.departamentRepository.find();
  }

  async createDepartament(departamentData: Partial<Departament>) {
    const newDepartament = this.departamentRepository.create(departamentData);
    await this.departamentRepository.save(newDepartament);
    return newDepartament;
  }
}

export default new DepartamentService();
