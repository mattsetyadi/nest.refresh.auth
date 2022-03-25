import { AtStrategy, RtStrategy } from './strategies';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  // option JwtModule usualy fill with exipation token or any options,
  // But we gonna generate 2 token for access and refresh,
  // so we gonna do it in services
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
