import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    question: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    packId: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    answer: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    hint?: string;

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    difficulty?: number;
}
