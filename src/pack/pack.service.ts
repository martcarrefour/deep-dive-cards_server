import { Injectable, Logger } from '@nestjs/common';
import { UpdatePackDto } from './dto/update-pack.dto';
import { CreatePackDto } from './dto';

import { PrismaService } from '@prisma/prisma.service';
import { JwtPayload } from '@auth/interfaces';

@Injectable()
export class PackService {
    private readonly logger = new Logger(PackService.name);
    constructor(private readonly prismaService: PrismaService) {}

    async create(createPackDto: CreatePackDto, user: JwtPayload) {
        const newPack = await this.prismaService.pack.create({
            data: {
                title: createPackDto.title,
                author: {
                    connect: {
                        id: user.id,
                    },
                },
                isPublic: createPackDto.isPublic,
            },
        });
        return newPack;
    }
    async findAll(user: JwtPayload) {
        const packs = await this.prismaService.pack.findMany({
            where: { userId: user.id },
        });
        return packs;
    }

    async findOne(id: number, user: JwtPayload) {
        const pack = await this.prismaService.pack.findFirst({
            where: { id: id, userId: user.id },
        });
        return pack;
    }

    update(id: number, updatePackDto: UpdatePackDto) {
        return `This action updates a #${id} pack`;
    }

    remove(id: number) {
        return `This action removes a #${id} pack`;
    }
}
