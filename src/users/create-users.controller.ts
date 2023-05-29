import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserService } from './services/create-user.service';

@Controller('users')
export class CreateUsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async registerUser(@Body() content: CreateUserDto) {
    try {
      const initialDate = new Date();
      const useCaseRun = await this.createUserService.run({
        firstName: content.firstName,
        lastName: content.lastName,
        age: content.age,
      });
      const diff = new Date().getTime() - initialDate.getTime();
      console.log(`Cadastro de usuario: ${diff} ms.`);
      return useCaseRun;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
