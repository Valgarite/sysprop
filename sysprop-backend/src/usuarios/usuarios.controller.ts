import { Body, Controller, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuariosService: UsuariosService){}

    @Post()
    crearUsuario(@Body() nuevoUsuario: CrearUsuarioDto){
        return this.usuariosService.crearUsuario(nuevoUsuario)
    }
}
