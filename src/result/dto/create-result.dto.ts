import { ApiProperty } from '@nestjs/swagger';
import { UserAnswer } from '@prisma/client';
import { IsNotEmpty, IsBoolean, IsOptional, IsEnum, IsInt } from 'class-validator';

export class CreateResultDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    cardId: number;

    @ApiProperty({ required: false })
    @IsEnum(UserAnswer)
    @IsOptional()
    userAnswer?: UserAnswer;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    usedHint?: boolean;
}
