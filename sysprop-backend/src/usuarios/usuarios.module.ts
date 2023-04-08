import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Cargo } from 'src/entities/cargo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Cargo])],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
