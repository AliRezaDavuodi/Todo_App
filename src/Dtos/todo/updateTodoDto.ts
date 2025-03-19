import { Expose } from 'class-transformer'
import { IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'

export class UpdateTodoDto {
  @Expose()
  @IsOptional()
  @IsString()
  @MinLength(5)
  title?: string

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  description?: string

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  status?: number
}
