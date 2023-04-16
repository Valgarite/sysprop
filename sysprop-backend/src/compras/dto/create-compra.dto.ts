import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCompraDto {
    @IsNumber()
    @IsNotEmpty()
    idusuario: any;

    @IsNumber()
    @IsNotEmpty()
    idproveedor: any;
}