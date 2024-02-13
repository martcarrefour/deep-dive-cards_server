import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum, IsBoolean, IsDate } from 'class-validator';
import { UserRole, AuthProvider, User } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateUserDto implements User {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ required: false })
    @IsEnum(UserRole, { each: true })
    @IsOptional()
    roles: UserRole[];

    @ApiProperty({ required: false })
    @IsEnum(AuthProvider)
    @IsOptional()
    provider: AuthProvider;

    constructor(user: User) {
        Object.assign(this, user);
    }
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    updatedAt: Date;

    @ApiProperty()
    @IsBoolean()
    isBlocked: boolean;
}
