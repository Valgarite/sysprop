import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compra } from '../entities/compra.entity';
import { Proveedor } from 'src/entities/proveedor.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { union_Compra_Articulos } from 'src/entities/union_articulo_compra.entity';
import { RelacionarCompra } from './dto/incrementar.dto';

@Injectable()
export class ComprasService {
    constructor(@InjectRepository(Compra)
    private comprasRepository: Repository<Compra>,
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Proveedor)
    private proveedorsRepository: Repository<Proveedor>,

    @InjectRepository(union_Compra_Articulos)
    private unionRepository: Repository<union_Compra_Articulos>
  ) {}

  async getAllCompras(): Promise<Compra[]> {
    const compra = this.comprasRepository.find({relations: ['idusuario', 'idproveedor', 'union.articulo', 'union.compra']})
    return await compra;
  }

  async createCompra(nuevaCompra: CreateCompraDto): Promise<Compra> {
    
      const compra = new Compra()
      
      compra.fechaCreacion = new Date();
      compra.total = nuevaCompra.total;
      compra.idusuario = nuevaCompra.idusuario;
      compra.idproveedor = nuevaCompra.idproveedor;

    return await this.comprasRepository.save(compra);
  }

  async getCompraById(id: number): Promise<Compra> {

    return await this.comprasRepository.findOne(
      {
      where: {
        id,
      },
      relations: ['idusuario', 'idproveedor']
    });
  }

  async updateCompra(id: number, updateCompra: UpdateCompraDto): Promise<Compra> {
    const compra = await this.getCompraById(id);
    this.comprasRepository.merge(compra, updateCompra);
    return await this.comprasRepository.save(compra);
  }

  async deleteCompra(id: number): Promise<void> {
    await this.comprasRepository.delete(id);
  }

  //Esta función nunca devolvió las tablas como esperaba.
  //async getAllUnion(): Promise<union_Compra_Articulos[]> {
  //  const union = await this.unionRepository.find({relations: []})
  //  return union;
  //}

  async sumarInventario(descontar: RelacionarCompra): Promise<union_Compra_Articulos>{

    const relacionInventarioConCompra = new union_Compra_Articulos();

    relacionInventarioConCompra.cantidad = descontar.cantidad;
    relacionInventarioConCompra.articulo = descontar.articuloid;
    relacionInventarioConCompra.compra = descontar.compraid;

    return await this.unionRepository.save(relacionInventarioConCompra)
  }

}
