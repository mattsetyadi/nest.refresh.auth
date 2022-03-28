import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { JwtPayloadWithRt } from 'src/auth/types';

// Create decorator
export const getCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
