import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/crear-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CargoDto } from './dto/cargo.dto';

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
    postUsuario(@Body() newUsuario: CreateUsuarioDto){
        this.usuariosService.createUsuario(newUsuario);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUsuario: UpdateUsuarioDto) {
        return this.usuariosService.updateUsuario(id, updateUsuario);
    }

    @Delete(':id')
    delete(@Param('id') id: any) {
        return this.usuariosService.deleteUsuario(id);
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
        this.usuariosService.createCargo(newCargo);
    }

    @Put('/cargos/:id')
    updateCargo(@Param('id', ParseIntPipe) id: number, @Body() updateCargo: CargoDto) {
        return this.usuariosService.updateCargo(id, updateCargo);
    }

    @Delete('/cargos/:id')
    deleteCargo(@Param('id', ParseIntPipe) id: number) {
        return this.usuariosService.deleteCargo(id);
    }

}
