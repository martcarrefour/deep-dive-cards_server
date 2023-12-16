import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from '@prisma/prisma.service';
import { JwtPayload } from '@auth/interfaces';
import { Card, Result, Session, UserAnswer } from '@prisma/client';

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
            include: { results: true },
        });
    }

    async findOne(id: number) {
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