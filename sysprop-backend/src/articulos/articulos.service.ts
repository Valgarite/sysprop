import { Injectable } from '@nestjs/common';
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

@Injectable()
export class ArticulosService {
    constructor(
        @InjectRepository(Articulo)
        private articulosRepository: Repository<Articulo>,
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,

        @InjectRepository(union_Compra_Articulos)
        private unionCompraRepository: Repository<union_Compra_Articulos>,
        ) {}
      
        async getAllArticulos(): Promise<Articulo[]> {
          return await this.articulosRepository.find({relations: ['categoria']});
        }
      
        async createArticulo(nuevoArticulo: CreateArticuloDto, categoria: Categoria): Promise<Articulo> {
            const articulo = new Articulo()
            
            articulo.nombre = nuevoArticulo.nombre;
            articulo.cantidad = nuevoArticulo.cantidad;
            articulo.precio = nuevoArticulo.precio;
            const articuloGuardado = await this.articulosRepository.save(articulo)

            categoria.articulos = [articuloGuardado, ...categoria.articulos]
            await categoria.save()
      
          return articuloGuardado ;
        }
      
        async getArticuloById(id: number): Promise<Articulo> {
          return await this.articulosRepository.findOne({
            where: {
              id,
            },
            relations:['categoria']
          });
        }

        async getArticuloByNombre(nombre: string): Promise<Articulo>{
          const articuloEncontrado = await this.articulosRepository.findOne({
            where: {
              nombre,
            },
          })
          return articuloEncontrado
        }

        async buscarArticulo(dto): Promise<Articulo>{
          return await this.articulosRepository.findOneBy({'nombre': dto.nombre})
        }

        async sumarArticulo(idArt: number, cantArt: number, sumatoria: number){
          const resultado = cantArt + sumatoria
          const mensaje = {
            "cantidad": resultado
          }

          return await this.updateArticulo(idArt, mensaje)
        }

        async restarArticulo(articulo: Articulo, cantidad: number){

          const resultado = articulo.cantidad - cantidad
          const mensaje = {
            "cantidad": resultado
          }

          return await this.updateArticulo(articulo.id, mensaje)
        }

        //chatgpgod
        async venderArticulo(mensaje: listaArticulosDto): Promise<{vendidos: Articulo[], noVendidos: Articulo[], noExistentes: string[]}>{
          console.log (mensaje)
          let articulos: string[] = mensaje.articulos
          let cantidades: number[] = mensaje.cantidades
      
          let listaArticulos: Articulo[] = [];
          let noVendidos: Articulo[] = [];
          let noExistentes: string[] = [];
      
          for (let i = 0; i < articulos.length; i++) {
              let articulo = await this.buscarArticulo(articulos[i]);
              console.log(articulo)
              if (!articulo) {
                  noExistentes.push(articulos[i]);
                  continue;
              }
              let valido = true;
              if (articulo.cantidad < cantidades[i]) {
                  noVendidos.push(articulo);
                  valido = false;
              }
              if (cantidades[i] > articulo.cantidad) {
                  throw new Error(`No hay suficiente inventario para ${articulo.nombre}. Cantidad disponible: ${articulo.cantidad}`);
              }
              if (valido) {
                  listaArticulos.push(articulo);
                  console.log(2)
                  await this.restarArticulo(articulo, cantidades[i]);
              }
          }
          console.log(3)

          return { vendidos: listaArticulos, noVendidos, noExistentes};
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

        async createCategoria(nuevaCategoria: CategoriaDto): Promise<Categoria>{
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
