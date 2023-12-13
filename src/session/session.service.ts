import { Injectable } from '@nestjs/common';
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
        const newSession = this.prismaService.session.create({
            data: {
                user: {
                    connect: { id: user.id },
                },
                pack: {
                    connect: { id: packId },
                },
            },
        });

        return newSession;
    }

    async findAll() {
        return `This action returns all session`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} session`;
    }

    async update(id: number, updateSessionDto: UpdateSessionDto) {
        return this.prismaService.session.update({where: })
    }

    async remove(id: number) {
        return `This action removes a #${id} session`;
    }
}
