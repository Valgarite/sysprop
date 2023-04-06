import { Controller, Get, Post, Body, Put, Param, Delete  } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto/create-venta.dto';
import { VentasService } from './ventas.service';
import { UpdateVentaDto } from './dto/update-venta.dto/update-venta.dto';

@Controller('ventas')
export class VentasController {
    constructor(private ventasService: VentasService){}

    @Get()
    getVentas(){
        return this.ventasService.getAllVentas();
    }

    @Get(':id')
    getVenta(@Param('id') id: number){
        return this.ventasService.getVentaById(id);
    }

    @Post()
    postVenta(@Body() newVenta: CreateVentaDto){
        this.ventasService.createVenta(newVenta);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateVenta: UpdateVentaDto) {
        return this.ventasService.updateVenta(id, updateVenta);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.ventasService.deleteVenta(id);
    }


}
