//El signo de interrogación indica que rellenar un atributo es opcional.
//Es decir, que si recibe null o undefined, se omite ese dato.
export interface UpdateClienteDto {
    nombre?: string;
    apellido?: string;
    cedula?: string;
    telefono?: string;
    direccion?: string;
  }