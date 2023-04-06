import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Articulo } from "./articulo.entity";
import { Usuario } from "./usuario.entity";
import { Cliente } from "./clientes.entity";
import { union_Venta_Articulos } from "./union_articulo_venta.entity";

@Entity({name:'ventas'})
export class Venta {
        @PrimaryGeneratedColumn()
        id: number; //PK

        @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
        fechaCreacion: Date;

        @Column()
        total: number;

        @ManyToOne(type => Usuario, usuario => usuario.id)
        idusuario: number; //FK

        @ManyToOne(type => Cliente, cliente => cliente.id)
        idcliente: number; //FK

        @OneToMany(type => union_Venta_Articulos, union=>union.venta)
        union: union_Venta_Articulos[]
}