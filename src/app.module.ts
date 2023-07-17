import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModel } from './user.module';
import { UserEntity } from './user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '1234567',
      database: 'test-db',
      entities: [UserEntity],
      synchronize: true,
    }),
    UserModel,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
