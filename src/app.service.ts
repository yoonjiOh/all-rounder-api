import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getProfileAndLoss(): string {
    return 'Profile and Loss';
  }
}
