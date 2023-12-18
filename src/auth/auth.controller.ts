import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpStatus,
    Post,
    Query,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { Tokens } from './interfaces';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Cookie, Public, UserAgent } from '@common/decorators';
import { UserResponse } from '@user/dto';
import { GoogleGuard } from './guards/google.guard';
import { BASE_URL } from './config';
import { HttpService } from '@nestjs/axios';
import { map, mergeMap } from 'rxjs';
import { handleTimeoutAndErrors } from '@common/helpers';
import { YandexGuard } from './guards/yandex.guard';
import { AuthProvider } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

const REFRESH_TOKEN = 'refreshtoken';

@Public()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const user = await this.authService.register(registerDto);
        if (!user) {
            throw new BadRequestException(
                `Не удалось зарегистрировать пользователя с данными: ${JSON.stringify(registerDto)}`,
            );
        }

        return new UserResponse(user);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response, @UserAgent() agent: string) {
        const tokens = await this.authService.login(loginDto, agent);

        if (!tokens) {
            throw new BadRequestException(`Не получается войти с данными: ${JSON.stringify(loginDto)}`);
        }

        this.setRefreshTokenToCookies(tokens, res);
    }

    @Post('logout')
    async logout(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
        console.log(refreshToken);
        if (!refreshToken) {
            res.sendStatus(HttpStatus.OK);
            return;
        }
        await this.authService.deleteRefreshToken(refreshToken);
        res.cookie(REFRESH_TOKEN, '', { httpOnly: true, secure: true, expires: new Date() });

        res.sendStatus(HttpStatus.OK);
    }

    @Get('refresh-tokens')
    async refreshTokens(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response, @UserAgent() agent: string) {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }

        const tokens = await this.authService.refreshTokens(refreshToken, agent);
        if (!tokens) {
            throw new UnauthorizedException();
        }

        this.setRefreshTokenToCookies(tokens, res);
    }

    @UseGuards(GoogleGuard)
    @Get('google')
    googleAuth() {}

    @UseGuards(GoogleGuard)
    @Get('google/callback')
    googleAuthCallback(@Req() req: Request, @Res() res: Response) {
        const token = req.user['accessToken'];
        //? add frontend url && add endpoint fron auth by google-token
        return res.redirect(`${this.configService.get(BASE_URL)}/auth/success-google?token=${token}`);
    }
    @UseGuards(YandexGuard)
    @Get('yandex')
    yandexAuth() {}

    @UseGuards(YandexGuard)
    @Get('yandex/callback')
    yandexAuthCallback(@Req() req: Request, @Res() res: Response) {
        const token = req.user['accessToken'];
        //? add frontend url && add endpoint fron auth by google-token
        return res.redirect(`${this.configService.get(BASE_URL)}/auth/success-yandex?token=${token}`);
    }

    @Get('success-google')
    successGoogle(@Query('token') token: string, @UserAgent() agent: string, @Res() res: Response) {
        return this.httpService.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`).pipe(
            mergeMap(({ data: { email } }) => this.authService.providerAuth(email, agent, AuthProvider.GOOGLE)),
            map((data) => this.setRefreshTokenToCookies(data, res)),
            handleTimeoutAndErrors(),
        );
    }

    @Get('success-yandex')
    successYandex(@Query('token') token: string, @UserAgent() agent: string, @Res() res: Response) {
        return this.httpService.get(`https://login.yandex.ru/info?format=json&oauth_token=${token}`).pipe(
            mergeMap(({ data: { default_email } }) =>
                this.authService.providerAuth(default_email, agent, AuthProvider.YANDEX),
            ),
            map((data) => this.setRefreshTokenToCookies(data, res)),
            handleTimeoutAndErrors(),
        );
    }

    setRefreshTokenToCookies(tokens: Tokens, res: Response) {
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
        return res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
    }
}
