import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@prisma/client';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePackDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    isPublic?: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray({ each: true })
    tags?: Tag[];
}
