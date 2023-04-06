export class UpdateVentaDto {
    fecha?: Date;
    total: number;
    idusuario?: number; //FK
    idcliente?: number; //FK
    idArticulo: number; //FK
    cantidad: number;
}
