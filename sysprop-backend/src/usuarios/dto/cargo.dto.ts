import { IsNotEmpty, IsString } from "class-validator";

export class CargoDto{
    @IsNotEmpty()
    @IsString()
    nombre: string;
}