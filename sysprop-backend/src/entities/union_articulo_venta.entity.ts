import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Articulo } from "./articulo.entity";
import { Venta } from "./venta.entity";

//TABLA DE UNIÓN
@Entity()
export class union_Venta_Articulos {
    //EN CONDICIONES NORMALES ESTE ID NO HARÍA FALTA PERO TYPEORM NO PERMITE ENTITIES SIN PRIMARY COLUMN.
    @PrimaryGeneratedColumn()
    id: number;

    @Column({width: 4})
    cantidad: number;

    @Column({type: 'decimal', precision: 8, scale: 2})
    preciounitario: number;

    @Column({length: 80})
    nombreregistrado: string;

    @ManyToOne(() => Articulo, articulo => articulo.id)
    @JoinColumn()
    articulo: Articulo[];

    @ManyToOne(() => Venta, venta => venta.id)
    @JoinColumn()
    venta: Venta[];
}