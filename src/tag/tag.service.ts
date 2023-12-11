import { Injectable, Logger } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '@prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class TagService {
    private readonly logger = new Logger(TagService.name);
    constructor(private readonly prismaService: PrismaService) {}

    async create(createTagDto: CreateTagDto) {
        const newTag = await this.prismaService.tag.create({
            data: {
                title: createTagDto.title,
            },
        });
        return newTag;
    }

    async findAll() {
        const tags = await this.prismaService.tag.findMany();
        return tags;
    }

    async findOneById(id: number): Promise<Tag> {
        const tag = await this.prismaService.tag.findUnique({
            where: { id: id },
        });
        return tag;
    }

    update(id: number, updateTagDto: UpdateTagDto) {
        return `This action updates a #${id} tag`;
    }

    remove(id: number) {
        return `This action removes a #${id} tag`;
    }
}
