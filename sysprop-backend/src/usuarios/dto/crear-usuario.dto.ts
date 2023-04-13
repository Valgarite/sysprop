import { PartialType } from "@nestjs/swagger"
import { IsDate, IsDateString, IsISO8601, IsNotEmpty, IsNumber, IsString, isISO8601 } from "class-validator"

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
    @IsString()
    fechaNacimiento: Date

    @IsNotEmpty()
    @IsString()
    correo: string

    @IsNotEmpty()
    @IsNumber()
    cargo: number
}