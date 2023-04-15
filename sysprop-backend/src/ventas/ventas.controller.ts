import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe  } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto/create-venta.dto';
import { VentasService } from './ventas.service';
import { UpdateVentaDto } from './dto/update-venta.dto/update-venta.dto';
import { RelacionarVenta } from './dto/create-venta.dto/descontar.dto';
import { union_Venta_Articulos } from 'src/entities/union_articulo_venta.entity';
import { ApiTags } from '@nestjs/swagger';
import { ventaCompletaDto } from './dto/todalaventa.dto';
import { listaArticulosDto } from './dto/lista-articulos.dto';
import { ArticulosService } from 'src/articulos/articulos.service';

@ApiTags('Ventas')
@Controller('ventas')
export class VentasController {
    constructor(private ventasService: VentasService,
        private articulosService: ArticulosService){}

    @Get()
    getVentas(){
        return this.ventasService.getAllVentas();
    }

    @Get('/lista')
    getListaVentas(){
        return this.ventasService.getListaVentas();//falta terminar
    }
    
    @Get('/detalles/:id')
    getDetalles(@Param('id', ParseIntPipe) id:number){
        return this.ventasService.getDetalles(id); //falta terminar
    }

    @Get(':id')
    getVenta(@Param('id', ParseIntPipe) id: number){
        return this.ventasService.getVentaById(id);
    }

    @Post()
    postVenta(@Body() newVenta: CreateVentaDto){
        this.ventasService.createVenta(newVenta);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateVenta: UpdateVentaDto) {
        return this.ventasService.updateVenta(id, updateVenta);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.ventasService.deleteVenta(id);
    }

    @Post('/registrar')
    prueba(@Body() datos: CreateVentaDto, @Body() ventas: listaArticulosDto){
        return this.ventasService.asociarArticulosAVenta(datos,ventas)
    }

    // @Post('/pruebaart')
    // prueba2(@Body() datos: CreateVentaDto, @Body() ventas: listaArticulosDto){
    //     return this.articulosService.venderArticulo(ventas)
    // }
}
