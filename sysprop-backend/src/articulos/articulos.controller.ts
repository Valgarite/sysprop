import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { CategoriaDto } from './dto/categoria.dto';
import { ArticulosService } from './articulos.service';
import { CreateCompraDto } from 'src/compras/dto/create-compra.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsuarioDto } from 'src/usuarios/dto/crear-usuario.dto';
import { Articulo } from 'src/entities/articulo.entity';
import { listaArticulosDto } from './dto/lista-articulos.dto';
import { listaCompraDto } from './dto/lista-compra.dto';

@ApiTags('Articulos')
@Controller('articulos')
export class ArticulosController {
    constructor(private articulosService: ArticulosService){}


    @Get()
    getArticulos(){
        return this.articulosService.getAllArticulos();
    }

    @Get('/categorias')
    getCategorias(){
        return this.articulosService.getAllCategorias();
    }
    
    @Get(':id')
    getArticulo(@Param('id', ParseIntPipe) id: number){
        return this.articulosService.getArticuloById(id);
    }

    @Post()
    nuevoArticulo(@Body() newArticulo: CreateArticuloDto){
        return this.articulosService.createArticulo(newArticulo)
    }

    @Post('/comprar')
    async agregarArticulo(@Body() newArticulo: listaCompraDto){
        return this.articulosService.comprarArticulo(newArticulo)
    }

    @Post('/vender')
    async descontarArticulo(@Body() lista: listaArticulosDto){
        return this.articulosService.venderArticulo(lista)
    }

    //suma
    // @Post('/lista')
    // async postListaCompra(@Body() sumarCantidad: CreateArticuloDto){
    //     const agregado = sumarCantidad.cantidad
    //     const articuloEncontrado = this.articulosService.getArticuloByNombre(sumarCantidad.nombre)

    //     const idArticulo = (await articuloEncontrado).id
    //     const cantidadArticulo = (await articuloEncontrado).cantidad
        
    //     return await this.articulosService.sumarArticulo(idArticulo, cantidadArticulo, agregado);
    // }

    @Put(':id')
    updateArticulo(@Param('id', ParseIntPipe) id: number, @Body() updateArticulo: UpdateArticuloDto) {
        return this.articulosService.updateArticulo(id, updateArticulo);
    }

    @Delete(':id')
    deleteArticulo(@Param('id', ParseIntPipe) id: number) {
        return this.articulosService.desactivarArticulo(id);
    }



    @Get('/categorias/:id')
    getCategoria(@Param('id', ParseIntPipe) id: number){
        return this.articulosService.getCategoriaById(id);
    }

    @Post('/categorias')
    postCategoria(@Body() newCategoria: CategoriaDto){
        this.articulosService.createCategoria(newCategoria);
    }

    @Put('/categorias/:id')
    updateCategoria(@Param('id', ParseIntPipe) id: number, @Body() updateCategoria: CategoriaDto) {
        return this.articulosService.updateCategoria(id, updateCategoria);
    }

    @Delete('/categorias/:id')
    deleteCategoria(@Param('id', ParseIntPipe) id: number) {
        return this.articulosService.deleteCategoria(id);
    }

}
