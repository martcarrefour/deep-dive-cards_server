import { JWT_CONFIG } from '@auth/config';
import { JwtPayload } from '@auth/interfaces';
import { convertToSecondsUtil } from '@common/utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConflictException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRole, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { genSaltSync, hashSync } from 'bcrypt';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly configService: ConfigService,
    ) {}

    async create(user: Partial<User>) {
        const hashedPassword = user?.password ? this.hashPassword(user.password) : null;
        console.log(user.username);

        const existingUsername = await this.findByUsername(user.username);
        console.log(existingUsername);
        if (existingUsername) {
            throw new ConflictException('Username занят');
        }
        console.log(existingUsername);

        const createdUser = await this.prismaService.user.upsert({
            where: {
                email: user.email,
            },
            update: {
                password: hashedPassword ?? undefined,
                provider: user?.provider ?? undefined,
                roles: user?.roles ?? undefined,
                isBlocked: user.isBlocked ?? undefined,
                username: user?.username ?? undefined,
            },
            create: {
                email: user.email,
                password: hashedPassword,
                provider: user?.provider,
                roles: ['USER'],
                username: user.username,
            },
        });

        await this.cacheManager.set(createdUser.id, createdUser);
        await this.cacheManager.set(createdUser.email, createdUser);
        return createdUser;
    }

    async findByEmailOrId(idOrEmail: string, isReset = false): Promise<User> {
        if (isReset) {
            await this.cacheManager.del(idOrEmail);
        }

        const user = await this.cacheManager.get<User>(idOrEmail);

        if (!user) {
            const user = await this.prismaService.user.findFirst({
                where: {
                    OR: [{ id: idOrEmail }, { email: idOrEmail }],
                },
            });

            if (!user) {
                return null;
            }

            await this.cacheManager.set(idOrEmail, user, convertToSecondsUtil(this.configService.get(JWT_CONFIG.EXP)));
            return user;
        }
        return user;
    }
    async findByUsername(username: string, isReset = false): Promise<User> {
        if (!username) {
            return null;
        }

        if (isReset) {
            await this.cacheManager.del(username);
        }

        const user = await this.cacheManager.get<User>(username);

        if (!user) {
            const user = await this.prismaService.user.findFirst({
                where: { username },
            });

            if (!user) {
                return null;
            }

            await this.cacheManager.set(username, user, convertToSecondsUtil(this.configService.get(JWT_CONFIG.EXP)));
            return user;
        }
        return user;
    }

    async delete(id: string, user: JwtPayload) {
        if (user.id !== id && !user.roles.includes(UserRole.ADMIN)) {
            throw new ForbiddenException();
        }
        await Promise.all([this.cacheManager.del(id), this.cacheManager.del(user.email)]);
        return this.prismaService.user.delete({ where: { id: id }, select: { id: true } });
    }

    private hashPassword(password: string) {
        return hashSync(password, genSaltSync(10));
    }
}
