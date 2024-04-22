import { LoginUserDto } from 'dto/login-user.dto';
import { AuthService } from './auth.service';
import { Controller, Request, Post, Get, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Get('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('/signup')
  signUp(@Request() req) {
    return this.authService.signUp(req.body);
  }
}

// Implement logout and look into how to invalidate tokens
// Also look into role based access control

// Study in more detail and homogenize code...
// Authorization next
