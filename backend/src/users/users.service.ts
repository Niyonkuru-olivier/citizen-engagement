// src/users/users.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Find user by email
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { email } });
    this.logger.log(`findByEmail: ${email} -> ${!!user}`);
    return user ?? undefined;
  }

  // Create new user
  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    const savedUser = await this.userRepo.save(user);
    this.logger.log(`User created: ${savedUser.email}`);
    return savedUser;
  }

  // Find user by ID
  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { id } });
    this.logger.log(`findById: ${id} -> ${!!user}`);
    return user ?? undefined;
  }
}
