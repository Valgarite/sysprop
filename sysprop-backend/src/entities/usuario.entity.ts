import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cargo } from './cargo.entity';

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    cedula: string;

    @Column()
    nombre: string;

    @Column()
    fechaNacimiento: Date;

    @Column()
    correo: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @ManyToOne(()=>Cargo, cargo=>cargo.nombre)
    cargo: Cargo;
}