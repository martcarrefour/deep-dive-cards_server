import { Module } from '@nestjs/common';
import { PackService } from './pack.service';
import { PackController } from './pack.controller';

import { PrismaModule } from '@prisma/prisma.module';

@Module({
    controllers: [PackController],
    providers: [PackService],
    imports: [PrismaModule],
})
export class PackModule {}
