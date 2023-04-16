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
import { ClientesService } from 'src/clientes/clientes.service';

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
    private usuariosServices: UsuariosService,
    private clientesServices: ClientesService,
  ) {}

  async getAllVentas(): Promise<Venta[]> {
    const venta = this.ventasRepository.find({relations: ['idusuario', 'idcliente', 'union.articulo', 'union.venta']})
    return await venta;
  }

  async getListaVentas(): Promise<Venta[]>{
    const lista = await this.getAllVentas()
    let datosUsuario: Usuario
    let datosCliente: Cliente
    let display: Venta[] = []
    const respuesta = [{
      fechaVenta: Date,

    }]
    lista.forEach(element => {
      datosUsuario = element.idusuario
      datosCliente = element.idcliente
      console.log(datosUsuario.nombre)
      console.log(datosCliente.nombre)
      //const usuarioData = this.usuariosServices.getUsuarioById()
      //usuarioNombre = usuarioData
    });

    return
  }

  async getDetalles(idVenta: number){
    const cantidades: number[] = [];
    const venta = await this.ventasRepository.findOne({ where: { id: idVenta }, relations: ['union', 'idusuario', 'idcliente']})
    const ids = venta.union.map(union => union.id);
    let unionEnVenta: union_Venta_Articulos[]=[]
    let unionEnLista: union_Venta_Articulos

    /*datos artículos:*/ let nombresRegistro: string[]=[], cantidadesRegistro: number[]=[], preciosUsados: number[]=[]
    
    for (let i=0; i<ids.length; i++){
      unionEnVenta = await this.unionRepository.find({where: {id: ids[i]}, relations:['articulo']})
      unionEnLista = unionEnVenta[0]
      
      nombresRegistro.push(unionEnLista.nombreregistrado)
      cantidadesRegistro.push(unionEnLista.cantidad)
      preciosUsados.push(unionEnLista.preciounitario)
    }
    let total: number=0, num1: number, num2: number
    for(let j=0; j<preciosUsados.length; j++){
      num1 = cantidadesRegistro[j]
      num2 = preciosUsados[j]
      total += (num1*num2)
    }
    const fecha = venta.fechaCreacion
    
    const cliente = venta.idcliente, usuario = venta.idusuario;
    
    const nombreCliente = cliente.nombre; const cedulaCliente = cliente.cedula;
    const nombreUsuario = usuario.nombre; const cedulaUsuario = usuario.cedula;

    return {idVenta, fecha, nombreCliente, cedulaCliente, nombreUsuario, cedulaUsuario , nombresRegistro, cantidadesRegistro, preciosUsados, total}
    }
    // Ejemplo de ChatGPT que apliqué en la línea anterior: const articulo = await this.articuloRepository.findOne({ where: { id: 3 } }); // Realiza la consulta filtrando por id = 3

    // // // console.log(idVenta)
    // // // const busqueda: union_Venta_Articulos[] =[]
    // // // const todaUnion: union_Venta_Articulos[] = await this.unionRepository.find({relations: ['venta', 'articulo']})
    // // // console.log(todaUnion)
    // // // let xdUnion: union_Venta_Articulos
    // // // let ventasEnUnion: Venta[] = []
    // // // let xdVenta: Venta
    // // // let xd

    // // // let usuarioNombre: string; let clienteNombre: string

    // // // for (let i = 0; i < todaUnion.length; i++){
    // // //     console.log("buscando en index: ",i)
    // // //     console.log(todaUnion[i])
    // // //     xdUnion = todaUnion[i]
    // // //     ventasEnUnion = xdUnion.venta
    // // //     xdVenta = ventasEnUnion[i]
    // // //     console.log("ID VENTA: ", xdVenta.id)
    // // //     if(xdVenta.id == idVenta){
    // // //       console.log("VENTA ENCONTRADA\n",ventasEnUnion[i])
          
    // // //     }
    // // //     for(let j = 0; j<ventasEnUnion.length; i++){
          
    // // //     }
    // // //       // xdUnion = todaUnion[i]
    // // //       // console.log(xdUnion.venta[i])
    // // //       // ventasEnUnion.push(xdUnion.venta[i])
    // // //       // console.log(ventasEnUnion)

    // // //     }

    // // return this.unionRepository.find({
    // //   where: { articulo: union.articuloid },
    // // })
    // // return {
    // //   "fechaCreacion": Date,
    // //   "total": 0,
    // //   "datosUsuario": "nombre",
    // //   "datosArticulo": "articulo[i].cantidad, articulo[i].nombre" //datosunion = [articulosid]; infoArticulos = [Articulos]
    // // }
    // const idVentaString = idVenta.toString()
    // console.log(tabla+'.ventaId = :ventaId')
    // const detallesVenta = this.unionRepository.
    // createQueryBuilder(tabla).
    // where(tabla+".ventaId = :venta', {idVenta}).
    // getOne();//tomar de la tabla de unión, el array de artículos y la venta individual
    // return detallesVenta
  

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
    //Pasar datos de venta
    venta.fechaCreacion = new Date(); venta.idusuario = crearVenta.idusuario; venta.idcliente = crearVenta.idcliente
    
    //Pasar datos tras actualizar inventario
    const ventaRealizada = (await this.articulosServices.venderArticulo(venderArts))
    venta.total=ventaRealizada.total
    
    //Pasar datos a tabla de union
    for (let i = 0; i < ventaRealizada.vendidos.length; i++) {
      unionVenta= new union_Venta_Articulos()
      unionVenta.cantidad = ventaRealizada.cantidadVendidos[i];
      unionVenta.articulo = ventaRealizada.listaArticulos[i].id;
      unionVenta.preciounitario = ventaRealizada.preciosUsados[i];
      unionVenta.nombreregistrado = ventaRealizada.vendidos[i];

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
