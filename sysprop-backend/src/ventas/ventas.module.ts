import { Module } from '@nestjs/common';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { Venta } from 'src/entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/clientes.entity';
import { union_Venta_Articulos } from 'src/entities/union_articulo_venta.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Articulo } from 'src/entities/articulo.entity';
import { ArticulosService } from 'src/articulos/articulos.service';
import { ArticulosModule } from 'src/articulos/articulos.module';
import { Categoria } from 'src/entities/categoria.entity';
import { union_Compra_Articulos } from 'src/entities/union_articulo_compra.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Cargo } from 'src/entities/cargo.entity';
import { ClientesService } from 'src/clientes/clientes.service';

@Module({
  imports: [ArticulosModule, TypeOrmModule.forFeature([Venta, Cliente, union_Venta_Articulos, Usuario, Articulo, Categoria, union_Compra_Articulos, Cargo])],
  controllers: [VentasController],
  providers: [VentasService, ArticulosService, UsuariosService, ClientesService],
  exports: [VentasService]
})
export class VentasModule {}
