import { PartialType } from "@nestjs/swagger";
import { CreateVentaDto } from "../create-venta.dto/create-venta.dto";
import { IsNumber } from "class-validator";

export class UpdateVentaDto extends PartialType(CreateVentaDto) {
    @IsNumber()
    idArticulo: number; //FK

    @IsNumber()
    cantidad: number;
}