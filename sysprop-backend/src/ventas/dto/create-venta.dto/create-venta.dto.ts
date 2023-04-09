import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateVentaDto {
    @IsNumber()
    @IsNotEmpty()
    idusuario: any;

    @IsNumber()
    @IsNotEmpty()
    idcliente: any;

    @IsNumber()
    @IsNotEmpty()
    total: number;
}