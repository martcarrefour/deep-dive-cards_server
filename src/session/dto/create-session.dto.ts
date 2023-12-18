import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateSessionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    packId: number;

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    difficulty?: number;
}
