import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articulo } from 'src/entities/articulo.entity';
import { Repository } from 'typeorm';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { CategoriaDto } from './dto/categoria.dto';
import { Categoria } from 'src/entities/categoria.entity';
import { union_Compra_Articulos } from 'src/entities/union_articulo_compra.entity';
import { union_Venta_Articulos } from 'src/entities/union_articulo_venta.entity';
import { listaArticulosDto } from './dto/lista-articulos.dto';
import { listaCompraDto } from './dto/lista-compra.dto';

@Injectable()
export class ArticulosService {
  constructor(
    @InjectRepository(Articulo)
    private articulosRepository: Repository<Articulo>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) { }

  async getAllArticulos(): Promise<Articulo[]> {
    return await this.articulosRepository.find()
  }

  async createArticulo(nuevoArticulo: CreateArticuloDto): Promise<Articulo> {
    const articulo = new Articulo()

    articulo.nombre = nuevoArticulo.nombre;
    articulo.cantidad = nuevoArticulo.cantidad;
    articulo.precio = nuevoArticulo.precio;
    articulo.categoria = nuevoArticulo.categoria
    await articulo.save()

    return articulo;
  }

  async getResumenHoy(): Promise<{suma: number, contador: number}>{
     const articulos = await this.articulosRepository.createQueryBuilder('venta')
        .getMany();
        let suma =0
        let contador = 0
        articulos.forEach(element => {
          contador += 1
          suma += parseFloat(element.cantidad.toString());
        });
    return {suma, contador}
  }

  async getArticuloById(id: number): Promise<Articulo> {
    return await this.articulosRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getArticuloByNombre(nombre: string): Promise<Articulo> {
    const articuloEncontrado = await this.articulosRepository.findOne({
      where: {
        nombre,
      },
    })
    return articuloEncontrado

  }

  // async buscarArticulo(dto: CreateArticuloDto): Promise<Articulo>{
  //   return await this.articulosRepository.findOne({where: {dto.nombre}})
  // }

  async sumarArticulo(articulo: Articulo, cantidad: number) {

    const resultado = articulo.cantidad + cantidad
    const mensaje = {
      "cantidad": resultado
    }

    return await this.updateArticulo(articulo.id, mensaje)
  }

  async restarArticulo(articulo: Articulo, cantidad: number) {

    const resultado = articulo.cantidad - cantidad
    const mensaje = {
      "cantidad": resultado
    }

    return await this.updateArticulo(articulo.id, mensaje)
  }

  //chatgpgod
  async venderArticulo(mensaje: listaArticulosDto,): Promise<{
    vendidos: string[], noVendidos: string[], noExistentes: string[],
    total: number, listaArticulos: Articulo[],
    cantidadVendidos: number[], preciosUsados: number[]
  }> {

    let articulos: string[] = mensaje.articulos
    let cantidades: number[] = mensaje.cantidades

    let listaArticulosNombre: string[] = [];
    let noVendidos: string[] = [];
    let noExistentes: string[] = [];
    let listaArticulos: Articulo[] = [];
    let cantidadVendidos: number[] = [];
    let preciosUsados: number[] = [];
    let total = 0;

    for (let i = 0; i < articulos.length; i++) {
      let articulo = await this.getArticuloByNombre(articulos[i]);
      if (!articulo) {
        noExistentes.push(articulos[i]);
        throw new HttpException(`"${articulos[i]}" no fue encontrado en los registros`, 406);
      }
      let valido = true;
      if (articulo.cantidad < cantidades[i]) {
        noVendidos.push(articulo.nombre);
        valido = false;
        throw new HttpException(`No hay suficiente "${articulo.nombre}" para cumplir con la venta. Cantidad restante en inventario: ${articulo.cantidad}.`, 406);
      }
      if (valido) {
        listaArticulosNombre.push(articulo.nombre);

        total += (articulo.precio * cantidades[i])
        await this.restarArticulo(articulo, cantidades[i]);
        articulo.cantidad = articulo.cantidad - cantidades[i]
        listaArticulos.push(articulo)
        cantidadVendidos.push(cantidades[i])
        if(cantidades[i]==0){
          throw new HttpException(`Intentó ingresar 0 unidades de artículo para la venta.`, 406)
        }
        preciosUsados.push(articulo.precio)
      }
    }

    return { vendidos: listaArticulosNombre, noVendidos, noExistentes, total, listaArticulos, cantidadVendidos, preciosUsados };
  }

  //#####################################################################
  async comprarArticulo(mensaje: listaCompraDto): Promise<
    {
      listaArticulos: Articulo[], total: number,
      cantidadComprados: number[], preciosUsadosEnCompra: number[]
    }> {
    let articulos: string[] = mensaje.articulos
    let cantidades: number[] = mensaje.cantidades
    let categorias: string[] = mensaje.categorias
    let precios: number[] = mensaje.precios

    let listaArticulos: Articulo[] = [];
    let cantidadComprados: number[] = [];
    let total = 0;
    let preciosUsadosEnCompra: number[] = []

    for (let i = 0; i < articulos.length; i++) {
      let articulo: Articulo
      const nuevoArticulo = {
        nombre: articulos[i],
        cantidad: cantidades[i],
      }
      console.log("registrando a: ", nuevoArticulo)
      let articuloEncontrado = await this.getArticuloByNombre(articulos[i]);
      if (articuloEncontrado) {
        articulo = await this.sumarArticulo(articuloEncontrado, nuevoArticulo.cantidad)
      } else {
      }
      total += (articuloEncontrado.precio * nuevoArticulo.cantidad)
      cantidadComprados.push(nuevoArticulo.cantidad)
      preciosUsadosEnCompra.push(articuloEncontrado.precio)
      if (nuevoArticulo.cantidad == 0){
        throw new HttpException(`Intentó agregar 0 unidades de${nuevoArticulo.nombre}`, 406)
      }
      listaArticulos.push(articuloEncontrado)

    }
    return { listaArticulos, total, cantidadComprados, preciosUsadosEnCompra };
  }



  //   async venderArticulo(mensaje: listaArticulosDto): Promise<{vendidos: Articulo[], noVendidos: string[], noExistentes: string[]}>{
  //     console.log (mensaje)
  //     let articulos: string[] = mensaje.articulos
  //     let cantidades: number[] = mensaje.cantidades

  //     let articulosEncontrados: Promise<Articulo>[] = [];
  //     let listaArticulos: Articulo[] = [];
  //     let noVendidos: Articulo[] = [];
  //     let noExistentes: string[] = [];
  //   //   let i = 0;
  //   //   // Buscar cada artículo en el repositorio
  //   //   articulos.forEach((cadaArticulo)=>{
  //   //       const articuloEncontrado = this.buscarArticulo(cadaArticulo);
  //   //       articulosEncontrados.push(articuloEncontrado);
  //   //   });
  //   //   const resultados = await Promise.all(articulosEncontrados);
  //   //   resultados.forEach((articulo, xd)=>{
  //   //     if(articulo && articulo.cantidad >= cantidades[xd]) {
  //   //         listaArticulos.push(articulo);
  //   //     } else {
  //   //         if (articulo) {
  //   //             noVendidos.push(articulo);
  //   //         } else {
  //   //             noExistentes.push(articulos[xd]);
  //   //         }
  //   //     }
  //   // })
  //   // ;
  //   //   // Devolver la lista de artículos vendidos y la lista de artículos no vendidos
  //   //   return {vendidos: listaArticulos, noVendidos: noExistentes};

  //   for (let i = 0; i < articulos.length; i++) {
  //     let articulo = await this.buscarArticulo(articulos[i]);
  //     console.log(articulo)
  //     if (!articulo) {
  //       noExistentes.push(articulos[i]);
  //       continue;
  //     }
  //     if (articulo.cantidad < cantidades[i]) {
  //       noVendidos.push(articulo);
  //       continue;
  //     }
  //     if (cantidades[i] > articulo.cantidad) {
  //       throw new Error(`No hay suficiente inventario para ${articulo.nombre}. Cantidad disponible: ${articulo.cantidad}`);
  //     }
  //     listaArticulos.push(articulo);
  //     console.log(2)
  //     await this.restarArticulo(articulo, cantidades[i]);
  //   }
  //   console.log(3)
  //   return { vendidos: listaArticulos, noVendidos: noVendidos.map(a => a.nombre),noExistentes};
  // }


  async updateArticulo(id: number, updateArticulo: UpdateArticuloDto): Promise<Articulo> {
    const articulo = await this.getArticuloById(id);
    this.articulosRepository.merge(articulo, updateArticulo);
    return await this.articulosRepository.save(articulo);
  }

  async desactivarArticulo(id: any): Promise<void> {
    const articulo = await this.getArticuloById(id);
    articulo.estado_activo = false
    await this.articulosRepository.save(articulo);
  }

  async deleteArticulo(id: any): Promise<void> {
    await this.articulosRepository.delete(id);
  }

  async getAllCategorias(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async getCategoriaById(id: number): Promise<Categoria> {
    return await this.categoriaRepository.findOne({
      where: {
        id,
      },
      relations: ['articulos']
    });
  }

  async createCategoria(nuevaCategoria: CategoriaDto): Promise<Categoria> {
    const categoria = new Categoria();
    categoria.nombre = nuevaCategoria.nombre;
    return await this.categoriaRepository.save(categoria)
  }

  async deleteCategoria(id: any): Promise<void> {
    await this.categoriaRepository.delete(id);
  }

  async updateCategoria(id: number, updateCategoria: CategoriaDto): Promise<Categoria> {
    const categoria = await this.getCategoriaById(id);
    this.categoriaRepository.merge(categoria, updateCategoria);
    return await this.categoriaRepository.save(categoria);
  }
}
