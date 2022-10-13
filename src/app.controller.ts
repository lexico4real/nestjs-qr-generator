import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async generateQRCode(): Promise<any> {
    return await this.appService.generateQRCode();
  }

  @Get('download')
  async downloadQRCode(): Promise<any> {
    return await this.appService.downloadQRCode();
  }
}
