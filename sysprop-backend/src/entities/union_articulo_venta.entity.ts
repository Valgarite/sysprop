import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Articulo } from "./articulo.entity";
import { Venta } from "./venta.entity";

//TABLA DE UNIÓN
@Entity()
export class union_Venta_Articulos {
    //EN CONDICIONES NORMALES ESTE ID NO HARÍA FALTA PERO TYPEORM NO PERMITE ENTITIES SIN PRIMARY COLUMN.
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidad: number;

    @ManyToOne(() => Articulo, articulo => articulo.id)
    articulo: number;

    @ManyToOne(() => Venta, venta => venta.id)
    venta: number;
}