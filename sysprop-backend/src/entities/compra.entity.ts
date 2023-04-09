import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { union_Compra_Articulos } from "./union_articulo_compra.entity";
import { Proveedor } from "./proveedor.entity";

@Entity({name:'compras'})
export class Compra extends BaseEntity{
        @PrimaryGeneratedColumn()
        id: number; //PK

        @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
        fechaCreacion: Date;

        @Column({type: 'decimal', precision: 8, scale: 2})
        total: number;

        @ManyToOne(type => Usuario, usuario => usuario.id)
        idusuario: number; //FK

        @ManyToOne(type => Proveedor, proveedor => proveedor.id)
        idproveedor: number; //FK

        @OneToMany(() => union_Compra_Articulos, union=>union.compra)
        union: union_Compra_Articulos[];
}