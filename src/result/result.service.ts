import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { CardService } from 'src/card/card.service';

@Injectable()
export class ResultService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly cardService: CardService,
    ) {}
    async create(createResultDto: CreateResultDto, sessionId: number): Promise<Result> {
        const cardRes = await this.cardService.findById(createResultDto.cardId);
        if (!cardRes) {
            throw cardRes;
        }
        const newResult = await this.prismaService.result.create({
            data: { ...createResultDto, sessionId },
        });
        return newResult;
    }

    async findAll(): Promise<Result[]> {
        const results = await this.prismaService.result.findMany();
        return results;
    }

    async findOne(id: number): Promise<Result> {
        const result = await this.prismaService.result.findUnique({
            where: { id },
        });

        if (!result) {
            throw new NotFoundException(`Result with ID ${id} not found.`);
        }

        return result;
    }

    async update(id: number, updateResultDto: UpdateResultDto): Promise<Result> {
        const resultRes = await this.findOne(id);

        if (!resultRes) {
            throw resultRes;
        }

        const updatedResult = await this.prismaService.result.update({
            where: { id },
            data: updateResultDto,
        });

        return updatedResult;
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);

        await this.prismaService.result.delete({
            where: { id },
        });
    }
}
