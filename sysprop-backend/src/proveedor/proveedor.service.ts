import { Injectable } from '@nestjs/common';
import { Proveedor } from "../entities/proveedor.entity";
import { UpdateProveedorDto } from './dto/updateProveedores.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProveedorDto } from './dto/proveedores.dto';

@Injectable()
export class ProveedoresService {
    constructor(
        @InjectRepository(Proveedor)
        private proveedoresRepository: Repository<Proveedor>,
        ) {}
      
        async getAllProveedores(): Promise<Proveedor[]> {
          return await this.proveedoresRepository.find();
        }
      
        async createProveedor(nuevoProveedor: CreateProveedorDto): Promise<Proveedor> {
            const proveedor = new Proveedor()
            
            proveedor.nombre = nuevoProveedor.nombre;
            proveedor.rif = nuevoProveedor.rif;
            proveedor.telefono = nuevoProveedor.telefono;
            proveedor.direccion = nuevoProveedor.direccion;
      
          return await this.proveedoresRepository.save(proveedor);
        }
      
        async getProveedorById(id: number): Promise<Proveedor> {
          return await this.proveedoresRepository.findOne({
            where: {
              id,
            },
          });
        }
      
        async updateProveedor(id: number, updateProveedor: UpdateProveedorDto): Promise<Proveedor> {
          const proveedor = await this.getProveedorById(id);
          this.proveedoresRepository.merge(proveedor, updateProveedor);
          return await this.proveedoresRepository.save(proveedor);
        }
      
        async deleteProveedor(id: any): Promise<void> {
          await this.proveedoresRepository.delete(id);
        }
}
