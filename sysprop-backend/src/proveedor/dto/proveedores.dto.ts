import { IsNotEmpty, IsString } from "class-validator";

export class CreateProveedorDto{
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    rif: string;

    @IsString()
    @IsNotEmpty()
    correo: string;
    
    @IsString()
    @IsNotEmpty()
    telefono: string;

    @IsString()
    correo: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;
}
