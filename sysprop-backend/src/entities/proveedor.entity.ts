import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venta } from "./venta.entity";

@Entity()
export class Proveedor {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        nombre: string;

        @Column()
        rif: string;

        @Column()
        telefono: string;

        @Column()
        direccion: string;

        @Column()
        correo: string;

        @OneToMany(type => Compra, compra => compra.id)
        compra: Compra[]
}