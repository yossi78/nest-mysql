import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async fillAll() {
    const response = await this.userService.findAll();
    return response;
    // res.status(HttpStatus.OK).json({ payload: response });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const response = await this.userService.findOne(id);
    return response;
  }

  @Post()
  async create(@Body() createUserDto: UserEntity) {
    const response = await this.userService.create(createUserDto);
    return response;
  }

  @Put(':id')
  async update(@Param() id: number, @Body() createUserDto: UserEntity) {
    const response = await this.userService.update(id, createUserDto);
    return response;
  }

  @Delete()
  async delete(@Body() id: number) {
    const response = await this.userService.remove(id);
    return response;
  }
}
