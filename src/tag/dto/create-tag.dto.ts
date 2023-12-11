import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;
}
