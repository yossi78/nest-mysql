
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user';
import { UserModel } from 'src/user/user.module';



export const databaseProviders = [
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
];
