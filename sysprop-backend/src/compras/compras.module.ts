import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { Proveedor } from 'src/entities/proveedor.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Compra } from 'src/entities/compra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { union_Compra_Articulos } from 'src/entities/union_articulo_compra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor, Usuario, Compra, union_Compra_Articulos])],
  providers: [ComprasService],
  controllers: [ComprasController]
})
export class ComprasModule {}
