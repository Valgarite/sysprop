import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Compra } from "./compra.entity";

@Entity()
export class Proveedor {
        @PrimaryGeneratedColumn()
        id: number;

        @Column({length: 80})
        nombre: string;

        @Column({length: 16})
        rif: string;

        @Column({length: 20})
        telefono: string;

        @Column({length: 120})
        direccion: string;

        @Column({length: 50})
        correo: string;

        @Column({default: ()=> 'TRUE'})
        estado_activo: boolean;

        @OneToMany(type => Compra, compra => compra.id)
        compra: Compra[]
}