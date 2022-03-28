import { ExecutionContext, Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // Implement caActivate because we have condition to bypass Public route
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // true = bypass, false = token required

    // We look for metadata 'isPublic' we create in Public decorator
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      // we looking isPublic by priority

      // 1 by Handler or per route
      context.getHandler(),
      // 2 By class controller or any classes
      context.getClass(),
    ]);

    // Activate guard by condittion isPublic is false

    // if is public
    if (isPublic) {
      return true;
    }

    // if isPublic false, execute the guards
    return super.canActivate(context);
  }
}
