import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { JwtPayload } from '@auth/interfaces';
import { Result, Session, UserAnswer } from '@prisma/client';
import { CreateSessionDto, UpdateSessionDto } from './dto';

@Injectable()
export class SessionService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(session: CreateSessionDto, user: JwtPayload, packId: number): Promise<Session> {
        const newSession = await this.prismaService.session.create({
            data: {
                userId: user.id,
                packId: packId,
                ...session,
            },
        });

        return newSession;
    }

    async findAll(userId: JwtPayload): Promise<Session[]> {
        return this.prismaService.session.findMany({
            where: {
                userId: userId.id,
            },
            include: { results: true },
        });
    }

    async findOne(id: number): Promise<Session> {
        const session = await this.prismaService.session.findUnique({
            where: {
                id,
            },
        });

        if (!session) {
            throw new NotFoundException(`Session with ID ${id} not found for the user.`);
        }

        return session;
    }

    async update(id: number, updateSessionDto: UpdateSessionDto): Promise<Session> {
        const updatedSession = await this.prismaService.session.update({
            where: {
                id,
            },
            data: updateSessionDto,
        });

        return updatedSession;
    }

    async delete(id: number): Promise<void> {
        await this.prismaService.session.delete({
            where: {
                id,
            },
        });
    }

    async getResultsForSession(sessionId: number): Promise<Result[]> {
        const session = await this.findOne(sessionId);

        if (!session) {
            throw new Error('Session not found');
        }

        return this.prismaService.result.findMany({
            where: {
                sessionId,
            },
        });
    }

    async updateSessionDifficulty(session: Session, userAnswer: UserAnswer): Promise<void> {
        let updatedDifficulty = session.difficulty;

        switch (userAnswer) {
            case UserAnswer.KNOW:
                updatedDifficulty += 1;
                break;

            case UserAnswer.DONT_KNOW:
                break;

            case UserAnswer.NOT_SURE:
                updatedDifficulty += 0.25;
                break;

            default:
                console.warn(`Unhandled UserAnswer value: ${userAnswer}`);
                break;
        }

        await this.prismaService.session.update({
            where: {
                id: session.id,
            },
            data: {
                difficulty: updatedDifficulty,
            },
        });
    }
}
