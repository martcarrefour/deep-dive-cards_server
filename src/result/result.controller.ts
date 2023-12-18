import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    ValidationPipe,
    UsePipes,
} from '@nestjs/common';
import { ResultService } from './result.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateResultDto, UpdateResultDto } from './dto';

@ApiBearerAuth()
@ApiTags('result')
@UsePipes(new ValidationPipe())
@Controller('sessions/:sessionId/results')
export class ResultController {
    constructor(private readonly resultService: ResultService) {}

    @Post()
    create(@Body() createResultDto: CreateResultDto, @Param('sessionId', ParseIntPipe) sessionId: number) {
        return this.resultService.create(createResultDto, sessionId);
    }

    @Get()
    findAll() {
        return this.resultService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.resultService.findOne(id);
    }

    @UsePipes(new ValidationPipe())
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateResultDto: UpdateResultDto) {
        return this.resultService.update(id, updateResultDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.resultService.remove(id);
    }
}
