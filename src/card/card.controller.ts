import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { OwnershipGuard } from '@auth/guards/ownership.guard';

@UseGuards(OwnershipGuard)
@Controller('packs/:packId/card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post()
    create(@Body() createCardDto: CreateCardDto, @Param('packId', ParseIntPipe) packId: number) {
        return this.cardService.create(createCardDto, packId);
    }

    @Get()
    findAll(@Param('packId', ParseIntPipe) packId: number) {
        return this.cardService.findAll(packId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number, @Param('packId', ParseIntPipe) packId: number) {
        return this.cardService.findById(id, packId);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCardDto: UpdateCardDto,
        @Param('packId', ParseIntPipe) packId: number,
    ) {
        return this.cardService.update(id, packId, updateCardDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number, @Param('packId', ParseIntPipe) packId: number) {
        return this.cardService.delete(id, packId);
    }
}
