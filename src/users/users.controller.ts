import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'dto/create-user.dto';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users') // route name
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Post()
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
}
