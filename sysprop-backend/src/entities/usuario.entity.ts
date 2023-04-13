import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cargo } from './cargo.entity';
import { Venta } from './venta.entity';

@Entity()
export class Usuario extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({length: 13})
    cedula: string;

    @Column({length: 64})
    nombre: string;

    @Column({type: 'date'})
    fechaNacimiento: Date;

    @Column({length: 45})
    correo: string;

    @Column({length: 25})
    username: string;

    @Column()
    password: string;

    @Column({default: ()=> 'TRUE'})
    estado_activo: boolean;

    @OneToMany(()=>Venta, venta=>venta.id)
    venta: Venta[]

    @ManyToOne(()=>Cargo, cargo=>cargo.id, {cascade: true})
    cargo: Cargo;
}
