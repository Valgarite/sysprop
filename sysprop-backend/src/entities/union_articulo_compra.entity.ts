import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Articulo } from "./articulo.entity";
import { Compra } from "./compra.entity";

//TABLA DE UNIÓN
@Entity()
export class union_Compra_Articulos extends BaseEntity{
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
    articulo: Articulo[];

    @ManyToOne(() => Compra, compra => compra.id)
    compra: Compra[];
}