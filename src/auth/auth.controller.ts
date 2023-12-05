import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { Tokens } from './interfaces';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Cookie, UserAgent } from '@common/decorators';

const REFRESH_TOKEN = 'refreshtoken';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        const user = await this.authService.register(dto);
        if (!user) {
            throw new BadRequestException(`Не удалось зарегистрировать пользователя с данными: ${JSON.stringify(dto)}`);
        }
    }

    @Post('login')
    async login(@Body() dto: LoginDto, @Res() res: Response, @UserAgent() agent: string) {
        const tokens = await this.authService.login(dto, agent);

        if (!tokens) {
            throw new BadRequestException(`Не получается войти с данными: ${JSON.stringify(dto)}`);
        }

        this.setRefreshTokenToCookies(tokens, res);
    }

    @Get('refresh-tokens')
    async refreshTokens(
        @Cookie(REFRESH_TOKEN) refreshTokens: string,
        @Res() res: Response,
        @UserAgent() agent: string,
    ) {
        if (!refreshTokens) {
            throw new UnauthorizedException();
        }

        const tokens = await this.authService.refreshTokens(refreshTokens, agent);
        if (!tokens) {
            throw new UnauthorizedException();
        }

        this.setRefreshTokenToCookies(tokens, res);
    }

    private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
        if (!tokens) {
            throw new UnauthorizedException();
        }
        res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(tokens.refreshToken.exp),
            secure: true,
            path: '/',
        });
        res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
    }
}
