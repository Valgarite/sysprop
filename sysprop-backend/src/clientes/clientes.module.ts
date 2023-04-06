import { Module } from '@nestjs/common';
import { Cliente } from 'src/entities/clientes.entity';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from 'src/entities/venta.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cliente, Venta])],
    controllers: [ClientesController],
    providers: [ClientesService]
  })
export class ClientesModule {}
