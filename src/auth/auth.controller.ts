import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  getCurrentUser,
  getCurrentUserId,
  Public,
} from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // Sign up and Sign in is public route and added Public decorator
  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(body);
  }
  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(body);
  }

  // Only delete refresh toke in db so nobody can refresh it
  // we get userId from token not params
  // to implement it, we need to user Guard (middleware Nest for auth)
  // and get identified from strategies

  /**
   *
   * Usually inside @UserGuard we use param AuthGuard
   * but we already create custom gurads named AtGuard
   * if there is no customization, we can simply put AuthGuard from next/common
   */
  // @UseGuards(AtGuard) becasuse we create global guard
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  // logout(@Req() req: Request) {
  // above is the old way before we create decorator, below is using out custom decorator
  logout(@getCurrentUserId() userId: number) {
    // const user = req.user;
    console.log('user logout controler', userId);
    this.authService.logout(userId);
  }

  // special case, we bypas it because it send refresh token not access token
  // we simply make it as Public and add guard for refresh token
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  // refreshToken(@Req() req: Request) {
  // above is the old way before we create decorator
  refreshToken(
    @getCurrentUserId() userId: number,
    @getCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }
}

/**
 * Big note about Auth guard
 * because if our application will growing and getting bigger
 * so we can put Auth guard in every module as Provider,
 * so waht happern if there is public route?
 * We can simply create new decorator @Public tu by pass token required
 * So what happen if we need RtGuard for refresh token?
 * We can simply create @Public in refresh token to bypass it
 * after that we use guard in that route wirh RtGuard
 * @Public()
 * @UseGuard(RtGuard)
 * We can set global Guard at main.ts or on app.module, every module or every class in controllers
 * You can simply check that
 */
