import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  // ✅ CREATE
  async createUser(name: string, email: string) {
    const user = this.repo.create({ name, email });
    const saved = await this.repo.save(user);

    return {
      success: true,
      message: 'User created successfully',
      data: saved,
    };
  }

  // ✅ READ
  async getUsers() {
    const users = await this.repo.find();

    return {
      success: true,
      message: 'Users fetched successfully',
      data: users,
    };
  }

  // ✅ UPDATE
  async updateUser(id: number, name: string, email: string) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.name = name;
    user.email = email;

    const updated = await this.repo.save(user);

    return {
      success: true,
      message: 'User updated successfully',
      data: updated,
    };
  }

  // ✅ DELETE
  async deleteUser(id: number) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.repo.remove(user);

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}