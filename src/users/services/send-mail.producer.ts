import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

export interface ISendProductsMail {
  fullName: string;
  email: string;
}

@Injectable()
export class SendMailProducer {
  constructor(@InjectQueue('sendmail-queue') private queue: Queue) {}
  async enqueue(dataOptions: ISendProductsMail) {
    this.queue.add('sendmail-job', dataOptions, { backoff: 1000, attempts: 3 });
  }
}
