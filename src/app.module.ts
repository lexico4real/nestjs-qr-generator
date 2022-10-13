import { Module } from '@nestjs/common';
import RandomCode from 'common/random-code';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RandomCode],
})
export class AppModule {}
