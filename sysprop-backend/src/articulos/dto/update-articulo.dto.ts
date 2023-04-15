//El signo de interrogación indica que rellenar un atributo es opcional.

import { IsNumber, IsString } from "class-validator";
import { Categoria } from "src/entities/categoria.entity";

//Es decir, que si recibe null o undefined, se omite ese dato.
export class UpdateArticuloDto {
  @IsString()
  nombre?: string;

  @IsNumber()
  cantidad?: number;

  @IsString()
  categoria?: string;
  }