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
import { UsuariosService } from 'src/usuarios/usuarios.service';

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

    private articulosServices: ArticulosService,
    private usuariosServices: UsuariosService
  ) {}

  async getAllVentas(): Promise<Venta[]> {
    const venta = this.ventasRepository.find({relations: ['idusuario', 'idcliente', 'union.articulo', 'union.venta']})
    return await venta;
  }

  async getListaVentas(): Promise<Venta[]>{
    const lista = await this.getAllVentas()
    let display: Venta[] = []
    lista.forEach(element => {
      const usuarioData = this.usuariosServices.getUsuarioById(element.idusuario.toString())
      console.log(usuarioData)
    });

    return
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

  async getDetalles(venta: number){
    console.log(venta)
    const detallesVenta = await this.unionRepository.findOne({where: {'venta': venta}, relations: ['articulo']})
    return detallesVenta
  }

  // async getTotalAPartirDeNombre(ventas: listaArticulosDto): Promise<string[]>{
  //     const articulos: string[] = ventas.articulos 
  //     const listaArticulos: string[] = []
  //   for (let i = 0; i < articulos.length; i++){
  //     const busqueda = await this.articulosServices.getArticuloByNombre(articulos[i])
  //     if(busqueda){
  //       listaArticulos.push(busqueda.nombre)
  //     }
  //   }
    
  //   return listaArticulos
  // }
  async getTotalAPartirDeNombre(ventas: listaArticulosDto): Promise<string[]>{
    const articulos: string[] = ventas.articulos 
    const listaArticulos: string[] = []
  for (let i = 0; i < articulos.length; i++){
    const busqueda = await this.articulosServices.getArticuloByNombre(articulos[i])
    if(busqueda){
      listaArticulos.push(busqueda.nombre)
    }
  }
  
  return listaArticulos
}

  //Asocia una lista de artículos a una sola venta
  async asociarArticulosAVenta(crearVenta: CreateVentaDto, venderArts: listaArticulosDto){
    const venta = new Venta()
    let unionVenta 
    console.log(crearVenta)
    console.log(venderArts)
    //Pasar datos de venta
    venta.fechaCreacion = new Date(); venta.idusuario = crearVenta.idusuario; venta.idcliente = crearVenta.idcliente
    
    //Pasar datos tras actualizar inventario
    const ventaRealizada = (await this.articulosServices.venderArticulo(venderArts))
    venta.total=ventaRealizada.total
    
    //Pasar datos a tabla de union
    for (let i = 0; i < ventaRealizada.vendidos.length; i++) {
      unionVenta= new union_Venta_Articulos()
      unionVenta.cantidad = ventaRealizada.cantidadVendidos[i]; unionVenta.articulo = ventaRealizada.listaArticulos[i].id
      console.log(await this.ventasRepository.save(venta))
      unionVenta.venta = venta.id
      console.log(await this.unionRepository.save(unionVenta))
    }

    return {Respuesta: venta.id}
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
