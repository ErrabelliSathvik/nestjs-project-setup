import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';   // ✅ // ✅ IMPORT MUST BE HERE (TOP)

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.createUser(body.name, body.email);
  }

  @Get()
  findAll() {
    return this.userService.getUsers();
  }
}