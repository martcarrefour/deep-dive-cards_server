import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
} from '@nestjs/common';
import { PackService } from './pack.service';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';

@Controller('pack')
export class PackController {
    constructor(private readonly packService: PackService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createPackDto: CreatePackDto, @CurrentUser() user: JwtPayload) {
        return this.packService.create(createPackDto, user);
    }

    @Get()
    async findAll(@CurrentUser() user: JwtPayload) {
        return this.packService.findAll(user);
    }

    @Get(':id/owner')
    async owner(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: JwtPayload) {
        const ownerId = await this.packService.findById(id, user);
        return ownerId;
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: JwtPayload) {
        const pack = await this.packService.findById(id, user);
        return pack;
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePackDto: UpdatePackDto,
        @CurrentUser() user: JwtPayload,
    ) {
        return this.packService.update(id, updatePackDto, user);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: JwtPayload) {
        return this.packService.delete(id, user);
    }
}
