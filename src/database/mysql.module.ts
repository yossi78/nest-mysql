import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
export class MysqlModule {}
