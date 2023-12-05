import { IsPasswordMatchingConstraint } from '@common/decorators';
import { IsEmail, IsString, MinLength, Validate } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @MinLength(6)
    @IsString()
    @Validate(IsPasswordMatchingConstraint)
    passwordRepeat: string;
}
