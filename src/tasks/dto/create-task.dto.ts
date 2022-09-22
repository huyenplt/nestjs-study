import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @MaxLength(50)
    description: string;
}
