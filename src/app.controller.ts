import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test/:id')
  getHello(@Param('id', ParseIntPipe) id: number) {
    return id;
  }
  @Post('test')
  postHello(): string {
    return this.appService.getHello();
  }
}
