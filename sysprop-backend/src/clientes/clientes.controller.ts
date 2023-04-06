import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ClientesService } from "./clientes.service";
import { CreateClienteDto } from "./dto/clientes.dto";
import { UpdateClienteDto } from './dto/updateClientes.dto';

@Controller('clientes')
export class ClientesController {
    constructor(private clientesService: ClientesService){}

    @Get()
    getCliente(){
        return this.clientesService.getAllClientes();
    }

    @Post()
    postCliente(@Body() newCliente: CreateClienteDto){
        this.clientesService.createCliente();
    }

    @Put(':id')
    updateCliente(@Param('id') id: string, @Body() updateCliente: UpdateClienteDto) {
        return this.clientesService.updateCliente(id, updateCliente);
    }

    @Delete(':id')
    deleteCliente(@Param('id') id: string) {
        return this.clientesService.deleteCliente(id);
    }

}
