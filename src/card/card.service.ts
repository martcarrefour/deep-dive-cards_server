import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class CardService {
    private readonly logger = new Logger(CardService.name);

    constructor(private readonly prismaService: PrismaService) {}

    async create({ question, answer, hint, level }: CreateCardDto, packId: number) {
        const newCard = await this.prismaService.card.create({
            data: {
                question,
                answer,
                hint,
                level,
                packId,
            },
        });
        return newCard;
    }

    async findAll(packId: number) {
        const cards = await this.prismaService.card.findMany({
            where: { packId },
        });

        return cards;
    }

    async findById(id: number, packId: number) {
        const card = await this.prismaService.card.findFirst({
            where: { id, packId },
        });
        if (!card) {
            throw new NotFoundException('ggg');
        }

        return card;
    }

    async update(id: number, packId: number, { question, answer, hint, level }: UpdateCardDto) {
        const card = await this.findById(id, packId);

        if (!card) {
            throw new NotFoundException();
        }

        const updatedCard = await this.prismaService.card.upsert({
            where: { id, packId },
            update: {
                question: question ?? undefined,
                answer: answer ?? undefined,
                hint: hint ?? undefined,
                level: level ?? undefined,
            },
            create: {
                question: question,
                answer: answer,
                hint: hint,
                level: level,
                packId,
            },
        });

        return updatedCard;
    }

    async delete(id: number, packId: number) {
        const card = await this.findById(id, packId);

        if (!card) {
            throw new NotFoundException();
        }

        return await this.prismaService.card.delete({
            where: {
                id,
                packId,
            },
        });
    }

    // async ownerId(id: number) {
    //     const card = await this.prismaService.card.findUniqueOrThrow({
    //         where: {
    //             id,
    //         },
    //         select: {
    //             pack: {
    //                 select: {
    //                     author: {
    //                         select: {
    //                             id: true,
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     });

    //     // Проверка, что card.pack не равен null
    //     if (card.pack) {
    //         return card.pack.author.id;
    //     } else {
    //         // Обработка ситуации, когда pack равен null
    //         // Например, выбросить ошибку или вернуть значение по умолчанию
    //         throw new Error('Pack is null for the given card id');
    //     }
    // }
}
