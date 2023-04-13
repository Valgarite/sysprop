import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Usuario } from 'src/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioService: UsuariosService

        @Inject()
        private authService: AuthService

    ){}
}
