import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Compra } from "./compra.entity";

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