import { Module } from '@nestjs/common';
import { PackService } from './pack.service';
import { PackController } from './pack.controller';

import { TagService } from 'src/tag/tag.service';

@Module({
    controllers: [PackController],
    providers: [PackService, TagService],
    exports: [PackService],
})
export class PackModule {}
