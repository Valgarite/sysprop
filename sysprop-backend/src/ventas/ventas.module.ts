import { Module } from '@nestjs/common';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { Venta } from 'src/entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/clientes.entity';
import { union_Venta_Articulos } from 'src/entities/union_articulo_venta.entity';
import { Usuario } from 'src/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, Cliente, union_Venta_Articulos, Usuario])],
  controllers: [VentasController],
  providers: [VentasService],
  exports: [VentasService]
})
export class VentasModule {}
