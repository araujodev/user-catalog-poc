import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

export interface IGetUser {
  userId: string;
}

@Injectable()
export class GetUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async run(userData: IGetUser): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id: userData.userId },
    });
  }
}
