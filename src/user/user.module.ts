import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mysqluser',
      password: 'mysqlpassword',
      database: 'testdb',
      entities: [],
      synchronize: true,
      extra: {
        dialectModule: require('mysql2'), // Add this line if using mysql2
      },
    }),
  ],
})
export class AppModule {}


export class UserModel {}
