import {
    ClassSerializerInterceptor,
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
    UseInterceptors,
} from '@nestjs/common';
import { UpdatePackDto } from './dto/update-pack.dto';
import { CreatePackDto } from './dto';

import { PrismaService } from '@prisma/prisma.service';
import { JwtPayload } from '@auth/interfaces';
import { Pack } from '@prisma/client';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class PackService {
    private readonly logger = new Logger(PackService.name);
    constructor(
        private readonly prismaService: PrismaService,
        private readonly tagService: TagService,
    ) {}

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
            include: {
                tags: true,
            },
        });
        return packs;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    async findById(id: number, user?: JwtPayload): Promise<Pack> {
        const pack = await this.prismaService.pack.findFirst({
            where: { id: id, userId: user.id },
            include: {
                tags: true,
            },
        });
        return pack;
    }

    async update(id: number, { title, isPublic, tags }: UpdatePackDto, user: JwtPayload) {
        const tagsIsValid = await this.tagService.checkTagsExisting(tags);

        if (!tagsIsValid) {
            throw new ConflictException('Invalid tags: at least one tag does not exist in the database');
        }

        const updatedPack = await this.prismaService.pack.upsert({
            where: { id, userId: user.id },
            update: {
                title: title ?? undefined,
                isPublic: isPublic ?? undefined,
                tags: {
                    set: tags ?? undefined,
                },
            },
            create: {
                title: title,
                userId: user.id,
                tags: {
                    create: tags,
                },
            },
            include: {
                tags: true,
            },
        });

        return updatedPack;
    }

    async delete(id: number, user: JwtPayload) {
        const pack = await this.findById(id, user);

        if (!pack) {
            throw new NotFoundException();
        }

        return await this.prismaService.pack.delete({
            where: {
                id,
                userId: user.id,
            },
        });
    }
}
