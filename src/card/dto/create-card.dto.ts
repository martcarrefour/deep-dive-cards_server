import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
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
