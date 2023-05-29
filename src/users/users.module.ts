import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CreateUserService } from './services/create-user.service';
import { SendMailProducer } from './services/send-mail.producer';
import { CreateUsersController } from './create-users.controller';
import { BullModule } from '@nestjs/bull';
import { GetUserService } from './services/get-user.service';
import { GetUserController } from './get-user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
      name: 'sendmail-queue',
    }),
  ],
  controllers: [CreateUsersController, GetUserController],
  providers: [CreateUserService, GetUserService, SendMailProducer],
  exports: [UsersModule],
})
export class UsersModule {}
