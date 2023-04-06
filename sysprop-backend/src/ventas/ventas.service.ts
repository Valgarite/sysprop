import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from '../entities/venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto/update-venta.dto';

@Injectable()
export class VentasService {
  constructor(@InjectRepository(Venta)
    private ventasRepository: Repository<Venta>
    //@InjectRepository(Usuario)
    //private usuariosRepository: Repository<Usuario>,
    //@InjectRepository(Cliente)
    //private clientesRepository: Repository<Cliente>,
  ) {}

  async getAllVentas(): Promise<Venta[]> {
    return await this.ventasRepository.find();
  }

  async createVenta(nuevaVenta: CreateVentaDto): Promise<Venta> {
    //const usuario = await this.usuariosRepository.findOne(nuevaVenta.idusuario);
    //const cliente = await this.clientesRepository.findOne(nuevaVenta.idcliente);

    const venta = this.ventasRepository.create({
    //  idusuario: usuario,
    //  idcliente: cliente,
      ...nuevaVenta,
    });
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
    return await this.ventasRepository.save(venta);
  }

  async deleteVenta(id: number): Promise<void> {
    await this.ventasRepository.delete(id);
  }
}
