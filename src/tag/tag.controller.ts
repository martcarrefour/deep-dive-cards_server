import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { RolesGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators';
import { UserRole } from '@prisma/client';

@UseGuards(RolesGuard)
@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Roles(UserRole.ADMIN)
    @Post()
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagService.create(createTagDto);
    }

    @Get()
    findAll() {
        return this.tagService.findAll();
    }

    @Get(':title')
    findByTitle(@Param('title') title: string) {
        return this.tagService.findByTitle(title);
    }

    @Roles(UserRole.ADMIN)
    @Patch(':title')
    update(@Param('title') title: string, @Body() updateTagDto: UpdateTagDto) {
        return this.tagService.update(title, updateTagDto);
    }

    @Roles(UserRole.ADMIN)
    @Delete(':title')
    delete(@Param('title') title: string) {
        return this.tagService.delete(title);
    }
}
