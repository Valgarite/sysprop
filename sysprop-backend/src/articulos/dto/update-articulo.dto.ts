//El signo de interrogación indica que rellenar un atributo es opcional.

import { Categoria } from "src/entities/categoria.entity";

//Es decir, que si recibe null o undefined, se omite ese dato.
export interface UpdateArticuloDto {
  nombre?: string;
  cantidad?: number;
  categoria?: Categoria;
  }