import { Controller, Get, Inject, Logger, LoggerService } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(
    private readonly appService: AppService,
  ) // @Inject(Logger) private readonly logger: LoggerService,
  {}

  @Get()
  getHello(): string {
    this.logger.log('Invoked getHello', 'AppController');
    return this.appService.getHello();
  }
}
