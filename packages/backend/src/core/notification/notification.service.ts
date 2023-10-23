import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  public constructor() {}

  public async mail() {
    // todo: generic function for email comfirmation
  }

  public async notify(data: string) {
    // todo: generic function for notification about different events
  }
}
