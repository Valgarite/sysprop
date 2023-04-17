import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/crear-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CargoDto } from './dto/cargo.dto';
import { ApiTags } from '@nestjs/swagger/dist';
import { loginUsuarioDto } from './dto/login.dto';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {

    constructor(private usuariosService: UsuariosService){}

    @Get()
    getUsuarios(){
        return this.usuariosService.getAllUsuarios();
    }

    @Get(':id')
    getUsuario(@Param('id') id: any){
        return this.usuariosService.getUsuarioById(id);
    }

    @Post()
    async postUsuario(@Body() newUsuario: CreateUsuarioDto){
        const cargo = await this.usuariosService.getCargoById(newUsuario.cargo)
        return this.usuariosService.createUsuario(newUsuario, cargo);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUsuario: UpdateUsuarioDto) {
        return this.usuariosService.updateUsuario(id, updateUsuario);
    }

    @Delete ('/bloqueartemporalmente/:id')
    bloquear(@Param('id') id: any) {
        return this.usuariosService.bloquearUsuario(id);
    }

    @Delete(':id')
    delete(@Param('id') id: any) {
        return this.usuariosService.desactivarUsuario(id);
    }

    @Get('/cargos/lista')
    getCargos(){
        return this.usuariosService.getAllCargos();
    }

    @Get('/cargos/:id')
    getCargo(@Param('id', ParseIntPipe) id: number){
        return this.usuariosService.getCargoById(id);
    }

    @Post('/cargos')
    postCargo(@Body() newCargo: CargoDto){
        return this.usuariosService.createCargo(newCargo);
    }

    @Put('/cargos/:id')
    updateCargo(@Param('id', ParseIntPipe) id: number, @Body() updateCargo: CargoDto) {
        return this.usuariosService.updateCargo(id, updateCargo);
    }

    @Delete('/cargos/:id')
    deleteCargo(@Param('id', ParseIntPipe) id: number) {
        return this.usuariosService.deleteCargo(id);
    }

    @Post('/login/')
    iniciarSesion(@Body() datosLogin: loginUsuarioDto){
        return this.usuariosService.login(datosLogin.username, datosLogin.password, datosLogin.intentos);
    }
}
