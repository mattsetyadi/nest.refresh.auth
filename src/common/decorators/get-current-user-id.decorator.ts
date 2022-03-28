import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { JwtPayload } from 'src/auth/types';

// Create decorator
export const getCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.sub;
  },
);
