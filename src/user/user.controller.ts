import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Patch,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from './responses';
import { JwtPayload } from '@auth/interfaces';
import { RolesGuard } from '@auth/guards/role.guard';
import { CurrentUser, Roles } from '@common/decorators';
import { UserRole, User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(RolesGuard)
    @Roles(UserRole.USER)
    @Get('me')
    async me(@CurrentUser() user: JwtPayload) {
        const me = await this.userService.findByEmailOrId(user.email);
        return new UserResponse(me);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Patch()
    async updateUser(@Body() body: Partial<User>) {
        const user = await this.userService.create(body);
        return new UserResponse(user);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':idOrEmail')
    async findOneUser(@Param('idOrEmail') idOrEmail: string) {
        console.log('gi');
        const user = await this.userService.findByEmailOrId(idOrEmail);
        if (!user) {
            throw new NotFoundException();
        }
        return new UserResponse(user);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) {
        return this.userService.delete(id, user);
    }
}
