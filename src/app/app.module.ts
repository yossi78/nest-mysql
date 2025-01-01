import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import * as dotenv from 'dotenv';

// Load .env file
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot()
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.ALL });
  }
}
