import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venta } from "./venta.entity";

@Entity()
export class Cliente {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        nombre: string;

        @Column()
        apellido: string;

        @Column()
        cedula: number;

        @Column()
        telefono: string;

        @Column()
        direccion: string;

        @OneToMany(type => Venta, venta => venta.id)
        venta: Venta[]

}