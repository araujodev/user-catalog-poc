import { NestFactory } from '@nestjs/core';
import { ConsumersModule } from './consumers.module';

async function bootstrap() {
  const app = await NestFactory.create(ConsumersModule);
  app.init();
}
bootstrap();
