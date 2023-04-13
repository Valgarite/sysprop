import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import * as bcrypt from 'bcrypt'
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AuthService {
  private usuariosService: UsuariosService
  
    constructor(
        private moduleRef: ModuleRef,
        private jwtService: JwtService,
        ) {}

    onModuleInit(){
      this.usuariosService = this.moduleRef.get(UsuariosService)
    }

    async signIn(username: string, pass: string): Promise<any> {
      const user = await this.usuariosService.getUsuarioByUsername(username);

      console.log(user)

      const autorizacion = await bcrypt.compare(pass, user.password)

            console.log(pass, user.password, autorizacion)
      if (!autorizacion) {
        throw new UnauthorizedException();
      }
      const payload = { username: user.username, sub: user.id };
      return{
        access_token: await this.jwtService.signAsync(payload),
      };
    }
}
