import { PartialType } from '@nestjs/mapped-types';
import { CreatePackDto } from './create-pack.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@prisma/client';
import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class UpdatePackDto extends PartialType(CreatePackDto) {
    @ApiProperty()
    @IsOptional()
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
