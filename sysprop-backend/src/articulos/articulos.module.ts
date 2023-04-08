import { Module } from '@nestjs/common';
import { ArticulosService } from './articulos.service';
import { ArticulosController } from './articulos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articulo } from 'src/entities/articulo.entity';
import { union_Venta_Articulos } from 'src/entities/union_articulo_venta.entity';
import { Categoria } from 'src/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Articulo, union_Venta_Articulos, Categoria])],
  providers: [ArticulosService],
  controllers: [ArticulosController]
})
export class ArticulosModule {}
