// src/services/CategoryService.ts

import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';

class CategoryService {
  private categoryRepository = getRepository(Category);

  async getAllCategories() {
    return this.categoryRepository.find();
  }

  async createCategory(categoryData: Partial<Category>) {
    const newCategory = this.categoryRepository.create(categoryData);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }
}

export default new CategoryService();
