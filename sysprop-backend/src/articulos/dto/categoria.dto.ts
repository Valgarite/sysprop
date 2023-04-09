import { IsNotEmpty, IsString } from "class-validator";

export class CategoriaDto{
    @IsString()
    @IsNotEmpty()
    nombre: string;
}