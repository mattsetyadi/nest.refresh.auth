import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [
    {
      // if Guard in app module, it auto Inject Reflector
      // here's also more scalable if we need so many Dependency Injection
      // such as Reflector, Prisma etc
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
