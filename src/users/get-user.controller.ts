import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { GetUserService } from './services/get-user.service';

@Controller('users')
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @Get(':userId')
  async findUser(@Param('userId') userId: string) {
    try {
      const initialDate = new Date();
      const useCaseRun = await this.getUserService.run({ userId });
      const diff = new Date().getTime() - initialDate.getTime();
      console.log(`Recuperar usuario: ${diff} ms.`);
      return useCaseRun;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
