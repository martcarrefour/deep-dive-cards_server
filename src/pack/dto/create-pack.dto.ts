import { Tag } from '@prisma/client';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePackDto {
    @IsString()
    title: string;

    @IsBoolean()
    @IsOptional()
    isPublic?: boolean = false;

    @IsOptional()
    @IsArray({ each: true })
    tags?: Tag[];
}
