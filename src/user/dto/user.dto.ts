import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { UserRole, AuthProvider } from '@prisma/client';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    username?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ required: false })
    @IsEnum(UserRole, { each: true })
    @IsOptional()
    roles?: UserRole[];

    @ApiProperty({ required: false })
    @IsEnum(AuthProvider)
    @IsOptional()
    provider?: AuthProvider;
}
