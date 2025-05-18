// src/auth/auth.service.ts

import { Injectable, UnauthorizedException, Logger, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Validate user by checking password hash
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      this.logger.warn(`Login failed: No user found for email ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordValid) {
      this.logger.warn(`Login failed: Incorrect password for ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    this.logger.log(`User validated successfully: ${email}`);
    return user;
  }

  // Login and return JWT token
  async login(email: string, password: string, role?: string) {
    const user = await this.validateUser(email, password);
    // Role check: only allow login if user role matches selected role
    if (role && user.role !== role) {
      this.logger.warn(`Login failed: User role mismatch. Tried to login as ${role}, but user is ${user.role}`);
      throw new UnauthorizedException(`You are not registered as ${role}. Please login with the correct role.`);
    }
    const jwtToken = this.jwtService.sign({ email: user.email, sub: user.id, role: user.role });
    this.logger.log(`JWT generated for user: ${email}`);
    return {
      access_token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
      },
    };
  }
  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Email not found');

    const token = Math.random().toString(36).substr(2, 8);
    user.resetToken = token;
    await this.userRepo.save(user);

    await this.sendResetEmail(email, token);
    return { message: 'Password reset link sent to your email.' };
  }

  async resetPassword(email: string, token: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { email, resetToken: token } });
    if (!user) throw new UnauthorizedException('Invalid token or email');

    const passwordErrors = this.validatePasswordStrength(newPassword);
    if (passwordErrors.length > 0)
      throw new UnauthorizedException(`Password issue(s): ${passwordErrors.join(', ')}`);

    const isSame = await bcrypt.compare(newPassword, user.password_hash);
    if (isSame) throw new UnauthorizedException('New password must be different from old password');

    user.password_hash = await bcrypt.hash(newPassword, 10);
    user.resetToken = '';
    await this.userRepo.save(user);

    return { message: 'Password successfully reset' };
  }

  // Dummy email sender for demonstration
  async sendResetEmail(email: string, token: string): Promise<void> {
    // In production, send an actual email
    this.logger.log(`Send reset email to ${email} with token: ${token}`);
  }

  validatePasswordStrength(password: string): string[] {
    const errors: string[] = [];
    if (password.length < 8) errors.push('at least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('an uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('a lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('a number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('a special character');
    return errors;
  }

}
