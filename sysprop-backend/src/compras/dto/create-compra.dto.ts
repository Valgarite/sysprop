import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCompraDto {
    @IsNumber()
    @IsNotEmpty()
    idusuario: number;

    @IsNumber()
    @IsNotEmpty()
    idproveedor: number;

    @IsNumber()
    @IsNotEmpty()
    total: number;
}