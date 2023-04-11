import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProveedoresService } from "./proveedor.service";
import { CreateProveedorDto } from "./dto/proveedores.dto";
import { UpdateProveedorDto } from './dto/updateProveedores.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proveedores')
@Controller('proveedores')
export class ProveedoresController {
    constructor(private proveedoresService: ProveedoresService){}

    @Get()
    getProveedores(){
        return this.proveedoresService.getAllProveedores();
    }

    @Get(':id')
    getProveedor(@Param('id', ParseIntPipe) id: number){
        return this.proveedoresService.getProveedorById(id);
    }

    @Post()
    postProveedor(@Body() newProveedor: CreateProveedorDto){
        this.proveedoresService.createProveedor(newProveedor);
    }

    @Put(':id')
    updateProveedor(@Param('id', ParseIntPipe) id: number, @Body() updateProveedor: UpdateProveedorDto) {
        return this.proveedoresService.updateProveedor(id, updateProveedor);
    }

    @Delete(':id')
    deleteProveedor(@Param('id', ParseIntPipe) id: number) {
        return this.proveedoresService.desactivarProveedor(id);
    }

}
