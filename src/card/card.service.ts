import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from '@prisma/prisma.service';
import { Card } from '@prisma/client';

@Injectable()
export class CardService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createCardDto: CreateCardDto, packId: number): Promise<Card> {
        return this.prismaService.card.create({
            data: {
                ...createCardDto,
                packId,
            },
        });
    }
    async findAll(packId: number): Promise<Card[]> {
        return this.prismaService.card.findMany({
            where: { packId },
        });
    }

    async findById(id: number, packId: number): Promise<Card> {
        const card = await this.prismaService.card.findFirst({
            where: { id, packId },
        });

        if (!card) {
            throw new NotFoundException('Card not found');
        }

        return card;
    }

    async update(id: number, packId: number, { question, answer, hint }: UpdateCardDto) {
        await this.findById(id, packId);

        return await this.prismaService.card.upsert({
            where: { id, packId },
            update: {
                question: question ?? undefined,
                answer: answer ?? undefined,
                hint: hint ?? undefined,
            },
            create: {
                question: question,
                answer: answer,
                hint: hint,
                packId,
            },
        });
    }

    async delete(id: number, packId: number): Promise<void> {
        await this.findById(id, packId);

        await this.prismaService.card.delete({
            where: { id, packId },
        });
    }
}
