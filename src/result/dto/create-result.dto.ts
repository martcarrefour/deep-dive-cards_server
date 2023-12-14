import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsNumber, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateResultDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    sessionId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cardId: number;

    @ApiProperty({ required: false })
    @IsString()
    userAnswer?: $Enums.UserAnswer;

    @ApiProperty({ required: false })
    @IsBoolean()
    usedHint?: boolean;
}
