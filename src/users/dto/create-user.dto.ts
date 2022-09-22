import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsAlphanumeric()
    @MaxLength(10)
    name: string;
    
    @ApiProperty()
    username: string;

    @ApiProperty()
    @MaxLength(10)
    @MinLength(4)
    password: string;
}