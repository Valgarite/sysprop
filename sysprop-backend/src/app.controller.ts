import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { UsuariosService } from './usuarios/usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rutas peladas')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private usuariosService: UsuariosService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getResumen(){
    const resumen = {
      
    }
  }

  @Post('/recuperar')
  async sendEmail(@Body() body: { to: string }) {
      var randomstring = require("randomstring");
      const contraRandom = randomstring.generate({length: 8, readable: true, charset: 'hex', capitalization: 'uppercase'});
      const recipiente = body.to
      const user = await this.usuariosService.buscarPorCorreo(recipiente);
      
      if (user) {
          const subject = 'Sistema de recuperación';
          this.usuariosService.sendEmail(body.to, subject, contraRandom);
      } else {
          // Manejar el caso en que no se encontró un usuario con el correo electrónico proporcionado
          // Puedes lanzar un error, enviar una respuesta específica, o realizar otra acción según tus necesidades
          throw new NotFoundException('Correo no encontrado');
  }}
}