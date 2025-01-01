import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './create.user.dto';
import { toUserEntity } from './user.mapper';
import * as dotenv from 'dotenv';

// Load .env file
dotenv.config();

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = toUserEntity(createUserDto);  // Convert DTO to Entity
    return this.userRepository.save(user);
  }

  async update(id: string, updatedUser: UserEntity) {
    await this.findOne(id);
    await this.userRepository.update(id, updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } }) || null;
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  getEnvVariables(): Record<string, string | undefined> {
    const envVariables = {
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_NAME: process.env.DB_NAME,
    };
    
    this.logger.log('Environment Variables:', JSON.stringify(envVariables, null, 2));
    return envVariables;
  }
}
