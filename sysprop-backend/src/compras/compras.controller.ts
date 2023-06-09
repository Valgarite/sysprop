import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { RelacionarCompra } from './dto/incrementar.dto';
import { ApiTags } from '@nestjs/swagger';
import { listaCompraDto } from 'src/articulos/dto/lista-compra.dto';

@ApiTags('Compras')
@Controller('compras')
export class ComprasController {
    constructor(private comprasService: ComprasService){}

    @Get()
    getCompras(){
        return this.comprasService.getAllCompras();
    }

    @Get('/detalles/:id')
    getDetalles(@Param('id', ParseIntPipe) id:number){
        return this.comprasService.getDetalles(id); //falta terminar
    }

    @Get(':id')
    getCompra(@Param('id', ParseIntPipe) id: number){
        return this.comprasService.getCompraById(id);
    }

    @Post()
    postCompra(@Body() newCompra: CreateCompraDto){
        this.comprasService.createCompra(newCompra);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCompra: UpdateCompraDto) {
        return this.comprasService.updateCompra(id, updateCompra);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.comprasService.deleteCompra(id);
    }

    @Post('/registrar')
    comprar(@Body() datos: CreateCompraDto, @Body() lista: listaCompraDto){
        return this.comprasService.asociarArticulosACompra(datos, lista)
    }

    // @Post('/union')
    // crearUnion(@Body() descontar: RelacionarCompra){
    // //    return this.comprasService.sumarInventario(descontar);
    // }
}
