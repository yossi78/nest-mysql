import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './create.user.dto';
import { toUserEntity } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = toUserEntity(createUserDto);  // Convert DTO to Entity
    return this.userRepository.save(user);
  }

  

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }


   async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } }) || null;
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }



  async update(id: string, updatedUser: UserEntity) {
    await this.checkUserExistance(id);
    await this.userRepository.update(id, updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.remove(user);
  }


  async checkUserExistance(id: string): Promise<void>{
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
  

  
}
