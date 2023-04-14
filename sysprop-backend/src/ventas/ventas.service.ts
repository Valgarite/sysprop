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
import { ArticulosService } from 'src/articulos/articulos.service';
import { listaArticulosDto } from 'src/articulos/dto/lista-articulos.dto';
import { Categoria } from 'src/entities/categoria.entity';

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

    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,

    private articulosServices: ArticulosService
  ) {}

  async getAllVentas(): Promise<Venta[]> {
    const venta = this.ventasRepository.find({relations: ['idusuario', 'idcliente', 'union.articulo', 'union.venta']})
    return await venta;
  }

  async createVenta(nuevaVenta: CreateVentaDto): Promise<Venta> {
    
      const venta = new Venta()
      
      venta.fechaCreacion = new Date();
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

  async getDetalles(id: number): Promise<union_Venta_Articulos> {
    const detallesVenta = await this.unionRepository.findOne({where: {id}, relations: ['articuloid']})
    return detallesVenta
  }

  async getTotalAPartirDeNombre(ventas: string[]): Promise<Articulo[]>{
    const listaArticulos: Articulo[] = []
  for (let i = 0; i < ventas.length; i++){
    listaArticulos.push(await this.articulosServices.getArticuloByNombre(ventas[i]))
  }
  return listaArticulos

  }

  //Asocia una lista de artículos a una sola venta
  async asociarArticulosAVenta(datosVenta: CreateVentaDto,lista: listaArticulosDto){
    const resultadoIntentoDeVenta = await this.articulosServices.venderArticulo(lista)
    //pasar esto a un bucle const total = this.articulosServices.getArticuloByNombre(resultadoIntentoDeVenta.vendidos)
    
    //this.createVenta()

  }
 

  //Esta función nunca devolvió las tablas como esperaba.
  //async getAllUnion(): Promise<union_Venta_Articulos[]> {
  //  const union = await this.unionRepository.find({relations: []})
  //  return union;
  //}

  //##################################################################################
  //comentada a las 2:07am 14/04
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
