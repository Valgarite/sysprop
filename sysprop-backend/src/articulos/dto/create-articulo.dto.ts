import { Categoria } from "src/entities/categoria.entity";

export class CreateArticuloDto{
    nombre: string;
    cantidad: number;
    categoria: Categoria;
}
