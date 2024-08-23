import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  get_healthcheck() {
    return { message: 'Hello stranger !' };
  }
}
