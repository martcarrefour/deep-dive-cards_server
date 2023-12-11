import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { title } from 'process';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

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

    @Patch(':title')
    update(@Param('title') title: string, @Body() updateTagDto: UpdateTagDto) {
        return this.tagService.update(title, updateTagDto);
    }

    @Delete(':title')
    delete(@Param('title') title) {
        return this.tagService.delete(title);
    }
}
