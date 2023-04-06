import { Injectable } from '@nestjs/common';
import { Cliente } from "../entities/clientes.entity";
import { UpdateClienteDto } from './dto/updateClientes.dto';

@Injectable()
export class ClientesService {

    private clientePrueba = [{
        id: 1,
        nombre: "nombrecliente",
        apellido: "apellidocliente",
        cedula: 34534534534534534,
        telefono: "telefonocliente",
        direccion: "direccioncliente",
        venta: [] 
    },
    {
        id: 2,
        nombre: "nombre2",
        apellido: "apellido2",
        cedula: 3453453,
        telefono: "telefonocliente2",
        direccion: "direccioncliente2",
        venta: []
    },
    {
        id: 123123,
        nombre: "este json está lleno de basura para probar validaciones",
        apellido: "435345_(/",
        cedula: 30152345,
        telefono: "campodetelefono",
        direccion: "",
        venta: []
    }
];

    getAllClientes(){
        return this.clientePrueba;
    }
    
    createCliente(){

    }

    updateCliente(id: string, updateCliente: UpdateClienteDto) {
        //TODO: IMPLEMENTAR JUNTO A TYPEORM.
        //EXPLICACIÓN: El objeto clientesRepository es una instancia de una clase que implementa la interfaz Repository 
        //de TypeORM y representa la entidad Cliente en la base de datos. La clase se encarga de realizar 
        //operaciones CRUD (Create, Read, Update, Delete) en la tabla clientes de la base de datos.

        //return this.clientesRepository.update(id, updateCliente);
    }

    async deleteCliente(id: string): Promise<void> {
        //TODO: IMPLEMENTAR JUNTO A TYPEORM.
        //EXPLICACIÓN: MISMA QUE LA ANTERIOR CON RESPECTO A CLIENTESREPOSITORY.

        //Async: Esto significa que la función puede realizar tareas que toman un tiempo para
        //completarse (como llamadas a una base de datos o solicitudes a una API)
        //sin bloquear la ejecución del programa.

        //Promise: En este caso, utilizamos Promise<void> para indicar que la función deleteCliente()
        //no devuelve ningún valor específico, ya que solo se encarga de eliminar un registro de la base de datos.
        //Por lo tanto, al usar la palabra clave async y Promise<void> juntos, indicamos que la
        //función deleteCliente() es una función asíncrona que devuelve una promesa que no tiene un valor específico.

        
        //await this.clientesRepository.delete(id);
      }
}
