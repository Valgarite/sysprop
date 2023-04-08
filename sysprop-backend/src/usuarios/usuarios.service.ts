import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/crear-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Cargo } from 'src/entities/cargo.entity';
import { CargoDto } from './dto/cargo.dto';

@Injectable()
    export class UsuariosService {
        constructor(
        @InjectRepository(Usuario)
        private usuariosRepository: Repository<Usuario>,
        
        @InjectRepository(Cargo)
        private cargoRepository: Repository<Cargo>

        ) {}
      
        async getAllUsuarios(): Promise<Usuario[]> {
          return await this.usuariosRepository.find();
        }
      
        async createUsuario(nuevoUsuario: CreateUsuarioDto): Promise<Usuario> {
            const usuario = new Usuario()
            
            usuario.cedula = nuevoUsuario.cedula;
            usuario.fechaNacimiento = nuevoUsuario.fechaNacimiento;
            usuario.nombre = nuevoUsuario.nombre;
            usuario.correo = nuevoUsuario.correo;
            usuario.password = nuevoUsuario.password;
            usuario.username = nuevoUsuario.username;
      
          return await this.usuariosRepository.save(usuario);
        }
      
        async getUsuarioById(id: string): Promise<Usuario> {
          return await this.usuariosRepository.findOne({
            where: {
              id,
            },
          });
        }
      
        async updateUsuario(id: string, updateUsuario: UpdateUsuarioDto): Promise<Usuario> {
          const usuario = await this.getUsuarioById(id);
          this.usuariosRepository.merge(usuario, updateUsuario);
          return await this.usuariosRepository.save(usuario);
        }
      
        async deleteUsuario(id: any): Promise<void> {
          await this.usuariosRepository.delete(id);
        }

        async getAllCargos(): Promise<Cargo[]> {
          return await this.cargoRepository.find();
        }

      async getCargoById(id: number): Promise<Cargo> {
      return await this.cargoRepository.findOne({
          where: {
          id,
          },
      });
      }

      async createCargo(nuevaCargo: CargoDto): Promise<Cargo>{
          const cargo = new Cargo();
          cargo.nombre = nuevaCargo.nombre;
          return await this.cargoRepository.save(cargo)
      }

      async deleteCargo(id: any): Promise<void> {
          await this.cargoRepository.delete(id);
        }

      async updateCargo(id: number, updateCargo: CargoDto): Promise<Cargo> {
          const cargo = await this.getCargoById(id);
          this.cargoRepository.merge(cargo, updateCargo);
          return await this.cargoRepository.save(cargo);
      }
}
