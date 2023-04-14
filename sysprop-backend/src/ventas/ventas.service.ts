import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from '../entities/venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto/update-venta.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { Cliente } from 'src/entities/clientes.entity';
import { RelacionarVenta } from './dto/create-venta.dto/descontar.dto';
import { union_Venta_Articulos } from 'src/entities/union_articulo_venta.entity';
import { Articulo } from 'src/entities/articulo.entity';
import { ventaCompletaDto } from './dto/todalaventa.dto';

@Injectable()
export class VentasService {
  constructor(@InjectRepository(Venta)
    private ventasRepository: Repository<Venta>,
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,

    @InjectRepository(Articulo)
    private articuloRepository: Repository<Articulo>,
    @InjectRepository(union_Venta_Articulos)
    private unionRepository: Repository<union_Venta_Articulos>,
  ) {}

  async getAllVentas(): Promise<Venta[]> {
    const venta = this.ventasRepository.find({relations: ['idusuario', 'idcliente', 'union.articulo', 'union.venta']})
    return await venta;
  }

  async createVenta(nuevaVenta: CreateVentaDto): Promise<Venta> {
    
      const venta = new Venta()
      
      venta.fechaCreacion = new Date();
      venta.total = nuevaVenta.total;
      venta.idusuario = nuevaVenta.idusuario;
      venta.idcliente = nuevaVenta.idcliente;

    return await this.ventasRepository.save(venta);
  }

  async getVentaById(id: number): Promise<Venta> {

    return await this.ventasRepository.findOne(
      {
      where: {
        id,
      },
      relations: ['idusuario', 'idcliente']
    });
  }

  async updateVenta(id: number, updateVenta: UpdateVentaDto): Promise<Venta> {
    const venta = await this.getVentaById(id);
    this.ventasRepository.merge(venta, updateVenta);
    return await this.ventasRepository.save(venta);
  }

  async deleteVenta(id: number): Promise<void> {
    await this.ventasRepository.delete(id);
  }

  //Esta función nunca devolvió las tablas como esperaba.
  //async getAllUnion(): Promise<union_Venta_Articulos[]> {
  //  const union = await this.unionRepository.find({relations: []})
  //  return union;
  //}

  //##################################################################################
  //comentada a las 2:07am
  // async restarInventario(ventaCompleta: ventaCompletaDto): Promise<union_Venta_Articulos>{

  //   const datosVenta.articulo: union_Venta_Articulos = ventaCompleta.articuloid
  //   const relacionInventarioConVenta = new union_Venta_Articulos();
  //   const venta = await this.createVenta(datosVenta);

  //   const descontar: CreateVentaDto = ventaCompleta
  //   relacionInventarioConVenta.cantidad = descontar.total;
  //   relacionInventarioConVenta.articulo = descontar.articuloid;
  //   relacionInventarioConVenta.venta = venta.id;

  //   return await this.unionRepository.save(relacionInventarioConVenta)
  // }
  //###############################################################################################
}
