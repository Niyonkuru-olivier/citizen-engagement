// src/users/users.controller.ts

import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: any) {
    const { full_name, email, password, role } = body;

    if (!email || !password || !full_name || !role) {
      throw new BadRequestException('Missing required fields.');
    }

    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('Email already registered.');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      full_name,
      email,
      password_hash,
      role,
    });

    return {
      message: 'User registered successfully',
      userId: newUser.id,
    };
  }
}
