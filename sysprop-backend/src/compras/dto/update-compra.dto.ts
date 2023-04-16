import { IsDate, IsNumber } from "class-validator";

export class UpdateCompraDto {
    fecha?: Date;
    total?: number;
    idusuario?: number; //FK
    idproveedor?: number; //FK
    idArticulo?: number; //FK
    cantidad?: number;
}
