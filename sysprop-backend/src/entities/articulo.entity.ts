import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Venta } from './venta.entity';
import { union_Venta_Articulos } from './union_articulo_venta.entity';


@Entity()
export class Articulo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    cantidad: number;

    //@Column()
    //categoria: string; //tipo enum y relacionado con la tabla de categorías
    //este dato debería ser eliminado en el diagrama de bdd

    //TO DO: RESOLVER RELACIONES Y TABLAS FALTANTES (FALTAN POQUITAS CARLOS VOS PODÉIS TE QUIERO MUCHO)
    //@ManyToOne(() => Categoria, categoria => categoria.nombre)
    //categoria: Categoria;

    @OneToMany(type => union_Venta_Articulos, union => union.articulo)
    union: union_Venta_Articulos[]
}