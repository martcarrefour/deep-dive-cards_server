import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller(':packId/card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post()
    create(@Body() createCardDto: CreateCardDto, @Param('packId') packId: string) {
        return this.cardService.create(createCardDto, +packId);
    }

    @Get()
    findAll(@Param('packId') packId: string) {
        return this.cardService.findAll(+packId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Param('packId') packId: string) {
        return this.cardService.findById(+id, +packId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto, @Param('packId') packId: string) {
        return this.cardService.update(+id, +packId, updateCardDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string, @Param('packId') packId: string) {
        return this.cardService.delete(+id, +packId);
    }
}
