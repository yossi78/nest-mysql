import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import * as dotenv from 'dotenv';
import * as winston from 'winston';

// Load .env file
dotenv.config();

const logger = winston.createLogger({
  format: winston.format.printf((info) => {
    const message = typeof info.message === 'string' ? info.message : JSON.stringify(info.message);
    return message;
  }),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

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

    // Log the environment variables as pretty JSON without level and timestamp
    logger.info(JSON.stringify({
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_NAME: process.env.DB_NAME
    }, null, 2));
  }
}
