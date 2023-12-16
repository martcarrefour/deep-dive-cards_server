import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsNumber, IsNotEmpty, IsString, IsBoolean, IsOptional, IsEnum } from 'class-validator';

export class CreateResultDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cardId: number;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @IsEnum($Enums.UserAnswer)
    userAnswer?: $Enums.UserAnswer;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    usedHint?: boolean;
}
