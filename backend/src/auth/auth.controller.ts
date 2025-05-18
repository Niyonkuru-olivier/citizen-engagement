import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { email, password, role } = body;
    return this.authService.login(email, password, role);
  }
  @Post('forgot-password')
  async forgot(@Body('email') email: string) {
    return await this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async reset(@Body() body: { email: string; token: string; newPassword: string }) {
    return await this.authService.resetPassword(body.email, body.token, body.newPassword);
  }
}
