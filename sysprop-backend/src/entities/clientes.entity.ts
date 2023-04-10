import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venta } from "./venta.entity";

@Entity()
export class Cliente {
        @PrimaryGeneratedColumn()
        id: number;

        @Column({length: 64})
        nombre: string;

        //CAMBIADO DE 13 A 15 PORQUE LOS PASAPORTES CONSTAN DE ENTRE 6 A 15 CARACTERES ALFANUMÉRICOS.
        @Column({length: 15})
        cedula: string;

        @Column({length: 20})
        telefono: string;

        //esta longitud es distinta a la de proveedor.direccion
        @Column({length: 100})
        direccion: string;

        @OneToMany(type => Venta, venta => venta.id)
        venta: Venta[]

}