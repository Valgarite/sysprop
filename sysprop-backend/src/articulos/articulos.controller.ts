import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { CategoriaDto } from './dto/categoria.dto';
import { ArticulosService } from './articulos.service';

@Controller('articulos')
export class ArticulosController {
    constructor(private articulosService: ArticulosService){}


    @Get()
    getArticulos(){
        return this.articulosService.getAllArticulos();
    }

    @Get(':id')
    getArticulo(@Param('id', ParseIntPipe) id: number){
        return this.articulosService.getArticuloById(id);
    }

    @Post()
    postArticulo(@Body() newArticulo: CreateArticuloDto){
        this.articulosService.createArticulo(newArticulo);
    }

    @Put(':id')
    updateArticulo(@Param('id', ParseIntPipe) id: number, @Body() updateArticulo: UpdateArticuloDto) {
        return this.articulosService.updateArticulo(id, updateArticulo);
    }

    @Delete(':id')
    deleteArticulo(@Param('id', ParseIntPipe) id: number) {
        return this.articulosService.deleteArticulo(id);
    }

    @Get('/categorias/lista')
    getCategorias(){
        return this.articulosService.getAllCategorias();
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
