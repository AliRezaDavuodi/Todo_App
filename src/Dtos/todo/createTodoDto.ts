import { IsInt, IsNotEmpty, IsOptional, IsString, Min, Max, MaxLength, MinLength } from 'class-validator'
import { Expose, Exclude } from 'class-transformer'
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export class CreateTodoDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title!: string

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  description?: string

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3) // Assuming status codes 1-3 (e.g., 1=Todo, 2=In Progress, 3=Done)
  status?: number

  // Auto-generated fields should be excluded
  @Exclude()
  id?: number

  @Exclude()
  @CreateDateColumn()
  created_at?: Date

  @Exclude()
  @UpdateDateColumn()
  updated_at?: Date

  @Exclude()
  @DeleteDateColumn()
  deleted_at?: Date
}
