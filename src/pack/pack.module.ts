import { Module } from '@nestjs/common';
import { PackService } from './pack.service';
import { PackController } from './pack.controller';

import { TagModule } from 'src/tag/tag.module';

@Module({
    controllers: [PackController],
    providers: [PackService],
    exports: [PackService],
    imports: [TagModule],
})
export class PackModule {}
