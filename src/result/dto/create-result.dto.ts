import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsEnum, IsInt } from 'class-validator';

export class CreateResultDto {
    @ApiProperty()
    @IsInt()
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
