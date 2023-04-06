import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Articulo } from './articulo.entity';

@Entity()
export class Categoria{
    @PrimaryColumn()
    id: number;

    @Column()
    nombre: string;
}