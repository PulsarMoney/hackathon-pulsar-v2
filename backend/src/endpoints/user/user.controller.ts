import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { CreateUserDto as UserDto } from './dto/createUserDto';

@Controller()
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async create(@Body() user: UserDto) {
    await this.userService.create(user);
  }

  @Put(':accountId')
  async update(@Param('accountId') accountId: string, @Body() user: UserDto) {
    await this.userService.update(accountId, user);
  }

  @Get('/')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
