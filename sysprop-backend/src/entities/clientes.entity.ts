import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venta } from "./venta.entity";

@Entity()
export class Cliente {
        @PrimaryGeneratedColumn()
        id: number;

        @Column({length: 64})
        nombre: string;

        @Column({length: 13})
        cedula: string;

        @Column({length: 20})
        telefono: string;

        @Column({length: 100})
        direccion: string;

        @OneToMany(type => Venta, venta => venta.id)
        venta: Venta[]

}