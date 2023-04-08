import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from '../entities/venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto/update-venta.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { Cliente } from 'src/entities/clientes.entity';
import { RelacionarVenta } from './dto/create-venta.dto/descontar.dto';

@Injectable()
export class VentasService {
  constructor(@InjectRepository(Venta)
    private ventasRepository: Repository<Venta>,
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  async getAllVentas(): Promise<Venta[]> {
    return await this.ventasRepository.find();
  }

  async createVenta(nuevaVenta: CreateVentaDto): Promise<Venta> {
      const venta = new Venta()
      
      venta.fechaCreacion = new Date();
      venta.total = nuevaVenta.total;
      venta.idusuario = nuevaVenta.idusuario;
      venta.idcliente = nuevaVenta.idcliente;

    return await this.ventasRepository.save(venta);
  }

  async getVentaById(id: number): Promise<Venta> {
    return await this.ventasRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateVenta(id: number, updateVenta: UpdateVentaDto): Promise<Venta> {
    const venta = await this.getVentaById(id);
    this.ventasRepository.merge(venta, updateVenta);
    return await this.ventasRepository.save(venta);
  }

  async deleteVenta(id: number): Promise<void> {
    await this.ventasRepository.delete(id);
  }
}
