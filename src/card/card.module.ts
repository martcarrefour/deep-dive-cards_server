import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { PackModule } from 'src/pack/pack.module';
import { OwnershipGuard } from '@auth/guards/ownership.guard';

@Module({
    controllers: [CardController],
    providers: [CardService, OwnershipGuard],
    imports: [PackModule],
})
export class CardModule {}
