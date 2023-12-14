import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { PackModule } from 'src/pack/pack.module';

@Module({
    controllers: [SessionController],
    providers: [SessionService],
    imports: [PackModule],
})
export class SessionModule {}
