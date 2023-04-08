import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articulo } from 'src/entities/articulo.entity';
import { Repository } from 'typeorm';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { CategoriaDto } from './dto/categoria.dto';
import { Categoria } from 'src/entities/categoria.entity';

@Injectable()
export class ArticulosService {
    constructor(
        @InjectRepository(Articulo)
        private articulosRepository: Repository<Articulo>,
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
        ) {}
      
        async getAllArticulos(): Promise<Articulo[]> {
          return await this.articulosRepository.find();
        }
      
        async createArticulo(nuevoArticulo: CreateArticuloDto): Promise<Articulo> {
            const articulo = new Articulo()
            
            articulo.nombre = nuevoArticulo.nombre;
            articulo.cantidad = nuevoArticulo.cantidad;
            articulo.categoria = nuevoArticulo.categoria;
      
          return await this.articulosRepository.save(articulo);
        }
      
        async getArticuloById(id: number): Promise<Articulo> {
          return await this.articulosRepository.findOne({
            where: {
              id,
            },
          });
        }
      
        async updateArticulo(id: number, updateArticulo: UpdateArticuloDto): Promise<Articulo> {
          const articulo = await this.getArticuloById(id);
          this.articulosRepository.merge(articulo, updateArticulo);
          return await this.articulosRepository.save(articulo);
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
