import { IsNotEmpty, IsString } from "class-validator"

export class loginUsuarioDto{
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    intentos: number

}