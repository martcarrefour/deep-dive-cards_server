import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from '@prisma/prisma.service';
import { JwtPayload } from '@auth/interfaces';

// userId
// packId
// depth
// score
// packScoreId

@Injectable()
export class SessionService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(session: CreateSessionDto, user: JwtPayload, packId: number) {
        const newSession = await this.prismaService.session.create({
            data: {
                userId: user.id,
                packId: packId,
            },
        });

        return newSession;
    }

    async findAll(userId: JwtPayload) {
        return this.prismaService.session.findMany({
            where: {
                userId: userId.id,
            },
        });
    }

    async findOne(id: number, user: JwtPayload) {
        const session = await this.prismaService.session.findUnique({
            where: {
                id,
                userId: user.id,
            },
        });

        if (!session) {
            throw new NotFoundException(`Session with ID ${id} not found for the user.`);
        }

        return session;
    }

    async update(id: number, updateSessionDto: UpdateSessionDto) {
        const updatedSession = await this.prismaService.session.update({
            where: {
                id,
            },
            data: updateSessionDto,
        });

        return updatedSession;
    }

    async remove(id: number) {
        const deletedSession = await this.prismaService.session.delete({
            where: {
                id,
            },
        });

        return `Session with ID ${deletedSession.id} has been deleted.`;
    }
}
