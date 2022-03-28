import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// import { AtGuard } from './common/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // Create global guard if we nanna implement globally
  // But in this bootstap it not support Dependency Injection
  // But we need Reflector DI to bypas public route
  // But we can create variable reflector and pass it in guard
  // const reflector = new Reflector()
  // app.useGlobalGuards(new AtGuard(reflector))
  // So we put global Guard in App Module
  await app.listen(8000);
}
bootstrap();
