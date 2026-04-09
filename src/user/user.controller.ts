import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() body: any) {
    return this.userService.createUser(body.name, body.email);
  }

  @Get()
  findAll() {
    return this.userService.getUsers();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.userService.updateUser(Number(id), body.name, body.email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}