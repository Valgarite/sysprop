import { Cargo } from "src/entities/cargo.entity"
import { CreateUsuarioDto } from "./crear-usuario.dto";
import { PartialType } from "@nestjs/swagger";

export class UpdateUsuarioDto{
    cedula?: string
    nombre?: string
    username?: string
    password?: string
    fechaNacimiento?: Date
    correo?: string
    cargo?: any
}