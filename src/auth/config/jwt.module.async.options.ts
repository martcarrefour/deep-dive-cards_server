import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { JWT_CONFIG } from './constants';

const jwtModuleOptions = (config: ConfigService): JwtModuleOptions => ({
    secret: config.get(JWT_CONFIG.SECRET),
    signOptions: {
        expiresIn: config.get(JWT_CONFIG.EXP, '5m'),
    },
});

export const options = (): JwtModuleAsyncOptions => ({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => jwtModuleOptions(config),
});
