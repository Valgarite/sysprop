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
import { Articulo } from 'src/entities/articulo.entity';
import { listaArticulosDto } from 'src/ventas/dto/lista-articulos.dto';
import { ArticulosService } from 'src/articulos/articulos.service';
import { listaCompraDto } from 'src/articulos/dto/lista-compra.dto';

@Injectable()
export class ComprasService {
    constructor(@InjectRepository(Compra)
    private comprasRepository: Repository<Compra>,

    @InjectRepository(union_Compra_Articulos)
    private unionRepository: Repository<union_Compra_Articulos>,
    
    private articulosServices: ArticulosService,
  ) {}

  async getAllCompras(): Promise<Compra[]> {
    const compra = this.comprasRepository.find({relations: ['idusuario', 'idproveedor', 'union.articulo', 'union.compra']})
    return await compra;
  }

  async createCompra(nuevaCompra: CreateCompraDto): Promise<Compra> {
    
      const compra = new Compra()
      
      compra.fechaCreacion = new Date();
      compra.idusuario = nuevaCompra.idusuario;
      compra.idproveedor = nuevaCompra.idproveedor;

    return compra
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

  async updateCompra(id: number, updateCompra): Promise<Compra> {
    const compra = await this.getCompraById(id);
    this.comprasRepository.merge(compra, updateCompra);
    return await this.comprasRepository.save(compra);
  }

  async deleteCompra(id: number): Promise<void> {
    await this.comprasRepository.delete(id);
  }

//##############################################################################################################
  async getListaCompras(): Promise<Compra[]>{
    const lista = await this.getAllCompras()
    let datosUsuario: Usuario
    let datosProveedor: Proveedor
    lista.forEach(element => {
      datosUsuario = element.idusuario
      datosProveedor = element.idproveedor
      console.log(datosUsuario.nombre)
      console.log(datosProveedor.nombre)
      //const usuarioData = this.usuariosServices.getUsuarioById()
      //usuarioNombre = usuarioData
    });
    return
  }

  async getDetalles(idCompra: number){
    const cantidades: number[] = [];
    const compra = await this.comprasRepository.findOne({ where: { id: idCompra }, relations: ['union', 'idusuario', 'idproveedor']})
    const ids = compra.union.map(union => union.id);
    let unionEnCompra: union_Compra_Articulos[]=[]
    let unionEnLista: union_Compra_Articulos

    /*datos artículos:*/ let nombresRegistro: string[]=[], cantidadesRegistro: number[]=[], preciosUsados: number[]=[]
    
    for (let i=0; i<ids.length; i++){
      unionEnCompra = await this.unionRepository.find({where: {id: ids[i]}, relations:['articulo']})
      unionEnLista = unionEnCompra[0]
      
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
    const fecha = compra.fechaCreacion
    
    const proveedor = compra.idproveedor, usuario = compra.idusuario;
    
    const nombreProveedor = proveedor.nombre; const rifProveedor = proveedor.rif;
    const nombreUsuario = usuario.nombre; const cedulaUsuario = usuario.cedula;

    return {idCompra, fecha, nombreProveedor, rifProveedor, nombreUsuario, cedulaUsuario , nombresRegistro, cantidadesRegistro, preciosUsados, total}
    }
    // Ejemplo de ChatGPT que apliqué en la línea anterior: const articulo = await this.articuloRepository.findOne({ where: { id: 3 } }); // Realiza la consulta filtrando por id = 3

    // // // console.log(idCompra)
    // // // const busqueda: union_Compra_Articulos[] =[]
    // // // const todaUnion: union_Compra_Articulos[] = await this.unionRepository.find({relations: ['compra', 'articulo']})
    // // // console.log(todaUnion)
    // // // let xdUnion: union_Compra_Articulos
    // // // let comprasEnUnion: Compra[] = []
    // // // let xdCompra: Compra
    // // // let xd

    // // // let usuarioNombre: string; let proveedorNombre: string

    // // // for (let i = 0; i < todaUnion.length; i++){
    // // //     console.log("buscando en index: ",i)
    // // //     console.log(todaUnion[i])
    // // //     xdUnion = todaUnion[i]
    // // //     comprasEnUnion = xdUnion.compra
    // // //     xdCompra = comprasEnUnion[i]
    // // //     console.log("ID VENTA: ", xdCompra.id)
    // // //     if(xdCompra.id == idCompra){
    // // //       console.log("VENTA ENCONTRADA\n",comprasEnUnion[i])
          
    // // //     }
    // // //     for(let j = 0; j<comprasEnUnion.length; i++){
          
    // // //     }
    // // //       // xdUnion = todaUnion[i]
    // // //       // console.log(xdUnion.compra[i])
    // // //       // comprasEnUnion.push(xdUnion.compra[i])
    // // //       // console.log(comprasEnUnion)

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
    // const idCompraString = idCompra.toString()
    // console.log(tabla+'.compraId = :compraId')
    // const detallesCompra = this.unionRepository.
    // createQueryBuilder(tabla).
    // where(tabla+".compraId = :compra', {idCompra}).
    // getOne();//tomar de la tabla de unión, el array de artículos y la compra individual
    // return detallesCompra

  // async getTotalAPartirDeNombre(compras: listaArticulosDto): Promise<string[]>{
  //     const articulos: string[] = compras.articulos 
  //     const listaArticulos: string[] = []
  //   for (let i = 0; i < articulos.length; i++){
  //     const busqueda = await this.articulosServices.getArticuloByNombre(articulos[i])
  //     if(busqueda){
  //       listaArticulos.push(busqueda.nombre)
  //     }
  //   }
    
  //   return listaArticulos
  // }
  async getTotalAPartirDeNombre(compras: listaArticulosDto): Promise<string[]>{
    const articulos: string[] = compras.articulos 
    const listaArticulos: string[] = []
  for (let i = 0; i < articulos.length; i++){
    const busqueda = await this.articulosServices.getArticuloByNombre(articulos[i])
    if(busqueda){
      listaArticulos.push(busqueda.nombre)
    }
  }
  
  return listaArticulos
}

  //Asocia una lista de artículos a una sola compra
  async asociarArticulosACompra(crearCompra: CreateCompraDto, listaCompra: listaCompraDto){
    const compra = new Compra()
    let unionCompra
    //Pasar datos de compra
    compra.fechaCreacion = new Date();
    compra.idusuario = crearCompra.idusuario;
    compra.idproveedor = crearCompra.idproveedor;
    const comprarArts = {
      articulos: listaCompra.articulos,
      cantidades: listaCompra.cantidades,
      precios: listaCompra.precios,
      categorias: listaCompra.categorias,
    }
    //Pasar datos tras actualizar inventario
    const compraRealizada = (await this.articulosServices.comprarArticulo(comprarArts))
    compra.total=compraRealizada.total
    
    //Pasar datos a tabla de union
    for (let i = 0; i < compraRealizada.listaArticulos.length; i++) {
      console.log(compraRealizada)
      unionCompra = new union_Compra_Articulos()
      unionCompra.cantidad = compraRealizada.cantidadComprados[i];
      unionCompra.articulo = compraRealizada.listaArticulos[i].id;
      unionCompra.preciounitario = compraRealizada.preciosUsadosEnCompra[i];
      unionCompra.nombreregistrado = compraRealizada.listaArticulos[i].nombre;
      
      console.log(await this.comprasRepository.save(compra))
      
      unionCompra.compra = compra.id
      console.log(unionCompra)
      console.log(await this.unionRepository.save(unionCompra))
    }
    return {Respuesta: compra.id}
  }
}
