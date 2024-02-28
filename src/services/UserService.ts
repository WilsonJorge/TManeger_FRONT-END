
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

class UserService {
  private userRepository = getRepository(User);

  async getAllUsers() {
    return this.userRepository.find();
  }

  async createUser(userData: Partial<User>) {
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }
}

export default new UserService();
