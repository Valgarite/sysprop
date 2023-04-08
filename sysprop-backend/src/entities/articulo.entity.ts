import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { union_Venta_Articulos } from './union_articulo_venta.entity';
import { union_Compra_Articulos } from './union_articulo_compra.entity';


@Entity()
export class Articulo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    cantidad: number;

    @ManyToOne(() => Categoria, categoria => categoria.nombre)
    categoria: Categoria;

    @OneToMany(type => union_Venta_Articulos, unionVenta => unionVenta.articulo)
    unionVenta: union_Venta_Articulos[]

    @OneToMany(type => union_Compra_Articulos, unionCompra => unionCompra.articulo)
    unionCompra: union_Compra_Articulos[]
}