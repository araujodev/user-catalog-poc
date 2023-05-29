import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { v4 as uuid } from 'uuid';
import { SendMailProducer } from './send-mail.producer';

export interface ICreateUser {
  firstName: string;
  lastName: string;
  age: number;
  id?: string;
}

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly sendMailProducer: SendMailProducer,
  ) {}

  async run(userToCreate: ICreateUser): Promise<User> {
    const user = this.usersRepository.create({
      id: uuid(),
      firstName: userToCreate.firstName,
      lastName: userToCreate.lastName,
      age: userToCreate.age,
    });
    const createdUser = await this.usersRepository.save(user);

    this.sendMailProducer.enqueue({
      fullName: `${createdUser.firstName} ${createdUser.lastName}`,
      email: 'donnell.gutkowski@ethereal.email',
    });

    return createdUser;
  }
}
