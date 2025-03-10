import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsBoolean, MinLength, MaxLength, IsPositive, IsNotEmpty, IsInt } from 'class-validator';

export class UpdateTodoDto {
    @IsNotEmpty()
    @Expose()
    id!: number

    @IsOptional()
    @MinLength(5)
    @Expose()
    title?: string;

    @IsString()
    @IsOptional()
    @MaxLength(150)
    @Expose()
    description?: string;
}