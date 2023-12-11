import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateCardDto extends PartialType(CreateCardDto) {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    question?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    answer?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    hint?: string;

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    level?: number;
}
