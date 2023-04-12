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

        async restarArticulo(idArt: number, cantArt: number, sumatoria: number){
          const resultado = cantArt - sumatoria
          const mensaje = {
            "cantidad": resultado
          }

          return await this.updateArticulo(idArt, mensaje)
        }

        async venderArticulo(articulosVendidos){
          
          let articulosEncontrados: Promise<Articulo>[] = []
          let listaArticulos: Articulo[] = []
          let noExistentes: string[]=[]
          const resultados: any[]=[]
          //Realizar un bucle dentro del cual se busque y modifique en el
          //repositorio cada artículo especificado en el array.
          await articulosVendidos.forEach((cadaArticulo)=>{
                  const articuloEncontrado = this.buscarArticulo(cadaArticulo)
                  articulosEncontrados.push(articuloEncontrado)
          })
          
          await Promise.all(articulosEncontrados).then((resultados)=>{
              let i = 0
              console.log("resultados", resultados)
              resultados.forEach((articulo)=>{
                if(articulo){
                  //if(articulo.cantidad > )
                  listaArticulos.push(articulo)
                } else {
                  //colocar otro if anidado en el que se validen las cantidades en
                  //existencia antes de proceder con la compra
                  noExistentes.push((articulosVendidos[i]))
                }
                i++
              })
          })

          resultados.push(listaArticulos)
          resultados.push(noExistentes)
          
          listaArticulos.forEach((articuloRestar)=>{
            const cantidadPasada = this.getArticuloById(articuloRestar.id)
            //CONTINUAR DESCOMENTANDO ACÁ this.restarArticulo(articuloRestar.id,articuloRestar.cantidad, )
          })

          return resultados
          //const articuloEncontrado = await this.articulosService.buscarArticulo(articuloVendido.nombre)
      }
      
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
