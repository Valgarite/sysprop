import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {

    constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>) {}

    crearUsuario(usuario){
        const nuevoUsuario = this.usuarioRepository.create(usuario)
        return this.usuarioRepository.save(nuevoUsuario)
    }
}
