import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Categoria } from "src/entities/categoria.entity";

export class CreateArticuloDto{
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNumber()
    @IsNotEmpty()
    cantidad: number;

    @IsNumber()
    @IsNotEmpty()
    precio: number;

    @IsNumber()
    @IsNotEmpty()
    categoria: number;
}
