import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ClientesService } from "./clientes.service";
import { CreateClienteDto } from "./dto/clientes.dto";
import { UpdateClienteDto } from './dto/updateClientes.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Compras')
@Controller('clientes')
export class ClientesController {
    constructor(private clientesService: ClientesService){}

    @Get()
    getClientes(){
        return this.clientesService.getAllClientes();
    }

    @Get(':id')
    getCliente(@Param('id', ParseIntPipe) id: number){
        return this.clientesService.getClienteById(id);
    }

    @Post()
    postCliente(@Body() newCliente: CreateClienteDto){
        this.clientesService.createCliente(newCliente);
    }

    @Put(':id')
    updateCliente(@Param('id', ParseIntPipe) id: number, @Body() updateCliente: UpdateClienteDto) {
        return this.clientesService.updateCliente(id, updateCliente);
    }

    @Delete(':id')
    deleteCliente(@Param('id', ParseIntPipe) id: number) {
        return this.clientesService.deleteCliente(id);
    }

}
