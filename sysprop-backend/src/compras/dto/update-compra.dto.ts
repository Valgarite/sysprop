import { IsDate, IsNumber } from "class-validator";

export class UpdateCompraDto {
    @IsDate()
    fecha?: Date;

    @IsNumber()
    total?: number;

    @IsNumber()
    idusuario?: number; //FK

    @IsNumber()
    idproveedor?: number; //FK

    @IsNumber()
    idArticulo?: number; //FK

    @IsNumber()
    cantidad?: number;
}
