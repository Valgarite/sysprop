import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { Proveedor } from 'src/entities/proveedor.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Compra } from 'src/entities/compra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { union_Compra_Articulos } from 'src/entities/union_articulo_compra.entity';
import { ArticulosService } from 'src/articulos/articulos.service';
import { Articulo } from 'src/entities/articulo.entity';
import { Cargo } from 'src/entities/cargo.entity';
import { union_Venta_Articulos } from 'src/entities/union_articulo_venta.entity';
import { Categoria } from 'src/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor, Usuario, Compra, union_Compra_Articulos, Articulo, Categoria])],
  providers: [ComprasService, ArticulosService],
  controllers: [ComprasController]
})
export class ComprasModule {}