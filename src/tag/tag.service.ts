import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Tag } from '@prisma/client';
import { CreateTagDto, UpdateTagDto } from './dto';

@Injectable()
export class TagService {
    private readonly logger = new Logger(TagService.name);
    constructor(private readonly prismaService: PrismaService) {}

    async create({ title }: CreateTagDto) {
        const tag = await this.findByTitle(title);

        if (tag) {
            throw new ConflictException();
        }

        const newTag = await this.prismaService.tag.create({
            data: {
                title: title ?? undefined,
            },
        });
        return newTag;
    }

    async findAll() {
        const tags = await this.prismaService.tag.findMany();
        return tags;
    }

    async findByTitle(title: string): Promise<Tag> {
        const tag = await this.prismaService.tag.findFirst({
            where: { title: title },
        });
        return tag;
    }

    async update(title: string, updateTagDto: UpdateTagDto) {
        const tag = await this.findByTitle(title);

        if (!tag) {
            throw new NotFoundException();
        }

        const updatedTag = await this.prismaService.tag.update({
            where: { title },
            data: { title: updateTagDto.title },
        });
        return updatedTag;
    }

    async delete(title: string) {
        const tag = await this.findByTitle(title);

        if (!tag) {
            throw new NotFoundException();
        }

        return await this.prismaService.tag.delete({
            where: {
                title,
            },
        });
    }

    async checkTagsExisting(tags: Tag[]) {
        const existingTags = await this.prismaService.tag.findMany();

        const tagsIsValid = tags.reduce((acc, tag) => {
            const tagExists = existingTags.some((existingTag) => existingTag.title === tag.title);

            if (!tagExists) {
                return false;
            }

            return acc;
        }, true);

        return tagsIsValid;
    }
}
