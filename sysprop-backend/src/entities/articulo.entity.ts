import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { union_Venta_Articulos } from './union_articulo_venta.entity';
import { union_Compra_Articulos } from './union_articulo_compra.entity';


@Entity()
export class Articulo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 80})
    nombre: string;

    @Column({width: 4})
    cantidad: number;

    @Column({type: 'decimal', precision: 8, scale: 2})
    precio: number;

    @ManyToOne(() => Categoria, categoria => categoria.nombre)
    categoria: Categoria;

    @Column({default: ()=> 'TRUE'})
    estado_activo: boolean;

    @OneToMany(type => union_Venta_Articulos, unionVenta => unionVenta.articulo)
    unionVenta: union_Venta_Articulos[]

    @OneToMany(type => union_Compra_Articulos, unionCompra => unionCompra.articulo)
    unionCompra: union_Compra_Articulos[]
}