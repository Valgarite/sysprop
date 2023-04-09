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

  //async crearRelacion(){
  //  const nuevaUnion = this.unionRepository.save (new union_Compra_Articulos)
  //  console.log ((await nuevaUnion).id)
  //  return (await nuevaUnion).id
  //}

  //async sumarInventario(nuevaCompra: CreateCompraDto, incrementar: RelacionarCompra, relacion: union_Compra_Articulos): Promise<union_Compra_Articulos>{

    //const compraRegistrada = new Compra()
    //compraRegistrada.fechaCreacion = new Date()
    //compraRegistrada.idproveedor = nuevaCompra.idproveedor
    //compraRegistrada.idusuario = nuevaCompra.idusuario

    //const compraGuardada = await this.comprasRepository.save(compraRegistrada)

    //relacion.compra = compraGuardada
    //console.log(compraGuardada)
    //console.log(relacion)
    //relacion.compra = [compraGuardada, ...[relacion.compra]]

    //const relacionInventarioConCompra = new union_Compra_Articulos();

    //relacionInventarioConCompra.cantidad = incrementar.cantidad;
    //relacionInventarioConCompra.articulo = incrementar.articuloid;
    //relacionInventarioConCompra.compra = []

    //return //await this.unionRepository.save(relacionInventarioConCompra)
  //}

}
