import { Injectable } from '@nestjs/common';
import { Cliente } from "./clientes.entity";

@Injectable()
export class ClientesService {

    private cliente: Cliente[] = [{
        id: "1",
        nombre: "nombrecliente",
        apellido: "apellidocliente",
        cedula: "34534534534534534",
        telefono: "telefonocliente",
        direccion: "direccioncliente"
    },
    {
        id: "2",
        nombre: "nombre2",
        apellido: "apellido2",
        cedula: "3453453",
        telefono: "telefonocliente2",
        direccion: "direccioncliente2"
    },
    {
        id:"id",
        nombre: "este json está lleno de basura para probar validaciones",
        apellido: "435345_(/",
        cedula: "adsfasdfasdfasdx",
        telefono: "campodetelefono",
        direccion: ""
    }
];

    getAllClientes(){
        return this.cliente;
    }
    
    createCliente(nombre:string,apellido:string,cedula:string,telefono:string,direccion:string){
        const cliente={
            id: new Date().toISOString(),
            nombre,
            apellido,
            cedula,
            telefono,
            direccion
        };
        this.cliente.push(cliente);

        return cliente
    }
    actualizarCliente(){}
    borrarCliente(){}
}
