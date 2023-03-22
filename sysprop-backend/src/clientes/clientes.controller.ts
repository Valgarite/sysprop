import { Controller, Get, Post, Body} from '@nestjs/common';
import { ClientesService } from "./clientes.service";
import { CreateClienteDto } from "./dto/clientes.dto";

@Controller('clientes')
export class ClientesController {
    constructor(private clientesService: ClientesService){}

    @Get()
    getCliente(){
        return this.clientesService.getAllClientes();
    }

    @Post()
    postCliente(@Body() newCliente: CreateClienteDto){
        this.clientesService.createCliente(newCliente.nombre, newCliente.apellido, newCliente.cedula, newCliente.telefono, newCliente.direccion);
    }
}
