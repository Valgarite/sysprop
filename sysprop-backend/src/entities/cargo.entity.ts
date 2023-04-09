import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Cargo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 15})
    nombre: string;

    @OneToMany(()=> Usuario, (usuario)=>usuario.cargo)
    usuarios: Usuario[]
}