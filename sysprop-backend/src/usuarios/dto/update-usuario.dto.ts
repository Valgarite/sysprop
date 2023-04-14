
import { CreateUsuarioDto } from "./crear-usuario.dto";
import { PartialType } from "@nestjs/swagger";

export class UpdateUsuarioDto{
    idDelQuePideElcambio: number
    cedula?: string
    nombre?: string
    username?: string
    password?: string
    fechaNacimiento?: Date
    correo?: string
    cargo?: string
}