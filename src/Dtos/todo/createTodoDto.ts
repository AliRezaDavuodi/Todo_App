import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class createTodoDto {
    @IsNotEmpty()
    @MinLength(5)
    @Expose()
    title!: string;

    @IsString()
    @IsOptional()
    @MaxLength(150)
    @Expose()
    description?: string;

    @IsNotEmpty()
    @IsPositive()
    @Expose()
    user_id!: number;
}

