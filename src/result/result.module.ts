import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { CardService } from 'src/card/card.service';

@Module({
    controllers: [ResultController],
    providers: [ResultService, CardService],
})
export class ResultModule {}
