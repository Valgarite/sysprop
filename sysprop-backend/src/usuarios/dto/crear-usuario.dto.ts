import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUsuarioDto{
    @IsNotEmpty()
    @IsString()
    cedula: string

    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsDate()
    fechaNacimiento: Date

    @IsNotEmpty()
    @IsString()
    correo: string

    @IsNotEmpty()
    @IsNumber()
    cargo: number
}