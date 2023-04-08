import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Articulo } from './articulo.entity';

@Entity()
export class Categoria{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(()=> Articulo, (articulo)=>articulo.categoria)
    articulos: Articulo[]
}