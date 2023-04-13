import { IsNotEmpty, IsString } from "class-validator"

export class signInDto{
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string
}