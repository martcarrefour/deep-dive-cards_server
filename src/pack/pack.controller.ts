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
    UnauthorizedException,
    NotFoundException,
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

    @Get(':id')
    async findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
        const pack = await this.packService.findOneById(+id, user);
        return pack;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePackDto: UpdatePackDto) {
        return this.packService.update(+id, updatePackDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.packService.remove(+id);
    }
}
