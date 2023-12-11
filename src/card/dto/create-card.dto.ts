import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
    @IsNotEmpty()
    @IsString()
    question: string;

    @IsString()
    answer: string;

    @IsString()
    hint: string;

    @IsInt()
    level: number;
}
