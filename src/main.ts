import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import winston, { format, transports } from 'winston';
import 'winston-daily-rotate-file';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      exitOnError: false,
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf((msg) => {
          return `${msg.timestamp} [${msg.level}] - ${msg.message}`;
        }),
      ),
      transports: [
        new transports.Console({ level: 'debug' }),
        new transports.DailyRotateFile({
          filename: 'app-%DATE%.log',
          dirname: './logs',
          level: 'info',
          handleExceptions: true,
          json: false,
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    }),
  });
  await app.listen(3000);
}
bootstrap();
