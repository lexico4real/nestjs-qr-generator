import { Injectable } from '@nestjs/common';
import RandomCode from 'common/random-code';
import * as QRCode from 'qrcode';
import CreateDirectory from 'common/create-directory';

@Injectable()
export class AppService {
  constructor(private readonly randomCode: RandomCode) {}
  randomString: string;

  generateRandomString(length: number): string {
    return this.randomCode.generate(length);
  }

  async generateQRCode(): Promise<any> {
    this.randomString = this.generateRandomString(26);
    try {
      const result = await QRCode.toDataURL(this.randomString);
      console.log(
        await QRCode.toString(this.randomString, {
          type: 'terminal',
        }),
      );
      return { status: 200, result, qrCode: this.randomString };
    } catch (error) {
      return error;
    }
  }

  async downloadQRCode(): Promise<any> {
    const createDirectory = new CreateDirectory();
    const homeDirectory = process.env.HOME;
    const downloadDirectory = homeDirectory + '/Downloads/qrimages';
    createDirectory.createDirectory(downloadDirectory, 0o744, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Directory created successfully!');
      }
    });
    try {
      const result = await QRCode.toFile(
        `${downloadDirectory}/${this.randomString}.png`,
        this.randomString,
      );
      return { status: 200, result, qrCode: this.randomString };
    } catch (error) {
      return error;
    }
  }
}
