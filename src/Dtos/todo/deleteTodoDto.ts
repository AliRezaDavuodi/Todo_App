import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class DeleteTodoDto {
    @IsInt()
    @IsNotEmpty()
    @Expose()
    id!: number
}