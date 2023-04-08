import { Injectable } from '@nestjs/common';
import { Cliente } from "../entities/clientes.entity";
import { UpdateClienteDto } from './dto/updateClientes.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClienteDto } from './dto/clientes.dto';

@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(Cliente)
        private clientesRepository: Repository<Cliente>,
        ) {}
      
        async getAllClientes(): Promise<Cliente[]> {
          return await this.clientesRepository.find();
        }
      
        async createCliente(nuevoCliente: CreateClienteDto): Promise<Cliente> {
            const cliente = new Cliente()
            
            cliente.nombre = nuevoCliente.nombre;
            cliente.cedula = nuevoCliente.cedula;
            cliente.telefono = nuevoCliente.telefono;
            cliente.direccion = nuevoCliente.direccion;
      
          return await this.clientesRepository.save(cliente);
        }
      
        async getClienteById(id: number): Promise<Cliente> {
          return await this.clientesRepository.findOne({
            where: {
              id,
            },
          });
        }
      
        async updateCliente(id: number, updateCliente: UpdateClienteDto): Promise<Cliente> {
          const cliente = await this.getClienteById(id);
          this.clientesRepository.merge(cliente, updateCliente);
          return await this.clientesRepository.save(cliente);
        }
      
        async deleteCliente(id: any): Promise<void> {
          await this.clientesRepository.delete(id);
        }
}
