import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

/**
 * Set Prisma module to global
 * because we dont want to import prisma service from module everywhere in module
 * like in auth, we dont wanna import it there but we need to use that
 * that because we need to make it global
 * and dont forget to export it
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
