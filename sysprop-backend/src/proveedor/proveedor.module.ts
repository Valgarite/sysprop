import { Module } from '@nestjs/common';
import { Proveedor } from 'src/entities/proveedor.entity';
import { ProveedoresController } from './proveedor.controller';
import { ProveedoresService } from './proveedor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from 'src/entities/compra.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Proveedor, Compra])],
    controllers: [ProveedoresController],
    providers: [ProveedoresService]
  })
export class ProveedoresModule {}
