import { ApiProperty } from '@nestjs/swagger';
import { Pack } from '@prisma/client';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    packId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    question: string;

    @ApiProperty({ required: false })
    @IsString()
    answer: string;

    @ApiProperty({ required: false })
    @IsString()
    hint?: string;

    @ApiProperty({ required: false })
    @IsInt()
    level?: number;
}
