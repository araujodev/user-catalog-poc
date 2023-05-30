import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendMailConsumer } from './users/services/send-mail.consumer';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './data-source';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'eulalia.boyle54@ethereal.email',
          pass: '3XHH6EdmaTczXKC4gh',
        },
      },
    }),
    BullModule.registerQueue({
      name: 'sendmail-queue',
    }),
  ],
  providers: [SendMailConsumer],
})
export class ConsumersModule {}
