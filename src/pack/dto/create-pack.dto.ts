import { Tag } from '@prisma/client';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePackDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    @IsOptional()
    isPublic?: boolean = false;

    @IsOptional()
    @IsArray({ each: true })
    tags?: Tag[];
}
