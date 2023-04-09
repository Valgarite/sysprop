import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Articulo } from './articulo.entity';

@Entity()
export class Categoria extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:30})
    nombre: string;

    @OneToMany(()=> Articulo, (articulo)=>articulo.categoria)
    articulos: Articulo[]
}