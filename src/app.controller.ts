import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('protected')
  // async getHello(): Promise<User[]> {
  //   // return this.appService.createUser('Test', 'test');
  //   return this.appService.getAll();
  // }

  getHello(@Request() req): string {
    return req.user;
  }
}
