import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cedula: number;

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

    @Column()
    cargo: string; //TO DO:adaptar después a FK hacia tabla de cargos
}