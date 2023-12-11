import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePackDto {
    @IsString()
    title: string;

    @IsBoolean()
    @IsOptional()
    isPublic: boolean;
}
