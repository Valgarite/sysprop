import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Cliente } from "./clientes.entity";
import { union_Venta_Articulos } from "./union_articulo_venta.entity";

@Entity({name:'ventas'})
export class Venta {
        @PrimaryGeneratedColumn()
        id: number; //PK

        @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
        fechaCreacion: Date;

        @Column({type: 'decimal', precision: 10, scale:2})
        total: number;

        @ManyToOne(type => Usuario, usuario => usuario.id)
        @JoinColumn()
        idusuario: Usuario; //FK

        @ManyToOne(type => Cliente, cliente => cliente.id)
        @JoinColumn()
        idcliente: Cliente; //FK

        @OneToMany(type => union_Venta_Articulos, union=>union.venta)
        @JoinColumn()
        union: union_Venta_Articulos[];
}