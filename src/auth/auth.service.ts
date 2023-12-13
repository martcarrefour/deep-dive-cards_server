import {
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UserService } from '@user/user.service';
import { Tokens } from './interfaces';
import { compareSync } from 'bcrypt';
import { AuthProvider, Token, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';

const BEARER = 'Bearer ';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
    ) {}

    async register(registerDto: RegisterDto) {
        const user: User = await this.userService.findByEmailOrId(registerDto.email).catch((err) => {
            this.logger.error(err);
            return null;
        });
        if (user) {
            throw new ConflictException('Пользователь с таким email уже зарегистрирован');
        }
        return this.userService.create(registerDto).catch((err) => {
            this.logger.error(err);
            return null;
        });
    }
    async login(login: LoginDto, agent: string): Promise<Tokens> {
        const user: User = await this.userService.findByEmailOrId(login.email, true).catch((err) => {
            this.logger.error(err);
            return null;
        });
        if (!user || !compareSync(login.password, user.password)) {
            throw new UnauthorizedException('Не верный логин или пароль');
        }
        return this.generateTokens(user, agent);
    }

    async deleteRefreshToken(token: string) {
        return await this.prismaService.token.delete({ where: { token } });
    }

    async refreshTokens(refreshTokens: string, agent: string): Promise<Tokens> {
        const token = await this.prismaService.token.delete({ where: { token: refreshTokens } });
        if (!token || new Date(token.exp) < new Date()) {
            throw new UnauthorizedException();
        }

        const user = await this.userService.findByEmailOrId(token.userId);
        return this.generateTokens(user, agent);
    }

    async providerAuth(email: string, agent: string, provider: AuthProvider) {
        const userExist = await this.userService.findByEmailOrId(email);
        if (userExist) {
            const user = await this.userService.create({ email, provider }).catch((err) => {
                this.logger.error(err);
                return null;
            });
            return this.generateTokens(user, agent);
        }
        const user = await this.userService.create({ email, provider }).catch((err) => {
            this.logger.error(err);
            return null;
        });
        if (!user) {
            //? Поправить везде exeption
            throw new HttpException(
                `Не получилось создать пользователя с email ${email} в ${provider}`,
                HttpStatus.BAD_REQUEST,
            );
        }
        return this.generateTokens(user, agent);
    }

    private async generateTokens(user: User, agent: string): Promise<Tokens> {
        const accessToken = this.jwtService.sign({
            id: user.id,
            email: user.email,
            roles: user.roles,
        });

        const refreshToken = await this.getRefreshToken(user.id, agent);

        return { accessToken, refreshToken };
    }

    private async getRefreshToken(userId: string, agent: string): Promise<Token> {
        const _token = await this.prismaService.token.findFirst({
            where: {
                userId,
                userAgent: agent,
            },
        });

        //? SOME FIX const token = _token?.token ?? '';
        const token = BEARER + _token?.token ?? '';

        return this.prismaService.token.upsert({
            where: { token },
            update: {
                token: v4(),
                exp: add(new Date(), { months: 1 }),
            },
            create: {
                token: v4(),
                exp: add(new Date(), { months: 1 }),
                userId,
                userAgent: agent,
            },
        });
    }
}
