//El signo de interrogación indica que rellenar un atributo es opcional.

import { IsString } from "class-validator";

//Es decir, que si recibe null o undefined, se omite ese dato.
export class UpdateClienteDto {
    @IsString()
    nombre?: string;

    @IsString()
    cedula?: string;

    @IsString()
    telefono?: string;

    @IsString()
    direccion?: string;
  }