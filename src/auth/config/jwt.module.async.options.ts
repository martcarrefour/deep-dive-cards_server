import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { JWT_EXP, JWT_SECRET } from './constants';

const jwtModuleOptions = (config: ConfigService): JwtModuleOptions => ({
    secret: config.get(JWT_SECRET),
    signOptions: {
        expiresIn: config.get(JWT_EXP, '5m'),
    },
});

export const options = (): JwtModuleAsyncOptions => ({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => jwtModuleOptions(config),
});
