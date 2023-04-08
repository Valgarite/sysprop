import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Articulo } from "./articulo.entity";
import { Compra } from "./compra.entity";

//TABLA DE UNIÓN
@Entity()
export class union_Compra_Articulos {
    //EN CONDICIONES NORMALES ESTE ID NO HARÍA FALTA PERO TYPEORM NO PERMITE ENTITIES SIN PRIMARY COLUMN.
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidad: number;

    @ManyToOne(type => Articulo, articulo => articulo.id)
    articulo: Articulo;

    @ManyToOne(type => Compra, compra => compra.id)
    compra: Compra;
}