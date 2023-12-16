import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { OwnershipGuard } from '@auth/guards/ownership.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('session')
@UseGuards(OwnershipGuard)
@Controller('packs/:packId/session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @Post()
    create(
        @Body() session: CreateSessionDto,
        @CurrentUser() user: JwtPayload,
        @Param('packId', ParseIntPipe) packId: number,
    ) {
        return this.sessionService.create(session, user, packId);
    }

    @Get()
    findAll(@CurrentUser() user: JwtPayload) {
        return this.sessionService.findAll(user);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.sessionService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSessionDto: UpdateSessionDto) {
        return this.sessionService.update(id, updateSessionDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.sessionService.remove(id);
    }
}
