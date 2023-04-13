import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/crear-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Cargo } from 'src/entities/cargo.entity';
import { CargoDto } from './dto/cargo.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,

    @InjectRepository(Cargo)
    private cargoRepository: Repository<Cargo>

  ) { }

  async getAllUsuarios(): Promise<Usuario[]> {
    return await this.usuariosRepository.find({ relations: ["cargo"] });
  }

  async createUsuario(nuevoUsuario: CreateUsuarioDto, cargo: Cargo): Promise<Usuario> {

    const usuario = new Usuario()

    usuario.cedula = nuevoUsuario.cedula;
    usuario.fechaNacimiento = nuevoUsuario.fechaNacimiento;
    usuario.nombre = nuevoUsuario.nombre;
    usuario.correo = nuevoUsuario.correo;
    usuario.password = nuevoUsuario.password;
    usuario.username = nuevoUsuario.username;
    const usuarioGuardado = await this.usuariosRepository.save(usuario)

    cargo.usuarios = [usuarioGuardado, ...cargo.usuarios]
    await cargo.save()

    return usuarioGuardado;
  }

  async getUsuarioById(id: string): Promise<Usuario> {
    const respuesta = this.usuariosRepository.findOne({
      where: {
        id,
      },
      relations: ["cargo"] 
    });

    return await respuesta
  }

  async updateUsuario(id: string, updateUsuario: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.getUsuarioById(id);
    this.usuariosRepository.merge(usuario, updateUsuario);
    return await this.usuariosRepository.save(usuario);
  }

  async desactivarUsuario(id: any): Promise<void> {
    const usuario = await this.getUsuarioById(id);
    usuario.estado_activo = false
    await this.usuariosRepository.save(usuario);
  }

  async deleteUsuario(id: any): Promise<void> {
    await this.usuariosRepository.delete(id);
  }

  //en crearusuarios, añadir el revisar si el nombre de usuario está ocupado
  async login(user: string, pass: string){
    const busquedaUsuario = await this.usuariosRepository.findOneBy({'username': user})
    if(busquedaUsuario){
      const busquedaContraseña = await this.usuariosRepository.findOneBy({'username': user, 'password': pass})
      if(busquedaContraseña){
        delete busquedaContraseña.password;
        const respuesta = busquedaContraseña
        return respuesta
      } else {
        return ({"respuesta": "Contraseña incorrecta"})
      }
    } else {
      return ({"respuesta": "No existe ese usuario"})
    }
  }


  async getAllCargos(): Promise<Cargo[]> {
    return await this.cargoRepository.find();
  }

  async getCargoById(id: number): Promise<Cargo> {
    return await this.cargoRepository.findOne({
      where: {
        id,
      },
      relations: ['usuarios']
    });
  }

  async createCargo(nuevaCargo: CargoDto): Promise<Cargo> {
    const cargo = new Cargo();
    cargo.nombre = nuevaCargo.nombre;
    return await this.cargoRepository.save(cargo)
  }

  async deleteCargo(id: any): Promise<void> {
    await this.cargoRepository.delete(id);
  }

  async updateCargo(id: number, updateCargo: CargoDto): Promise<Cargo> {
    const cargo = await this.getCargoById(id);
    this.cargoRepository.merge(cargo, updateCargo);
    return await this.cargoRepository.save(cargo);
  }

  async getCargoByNombre(nombre: string): Promise<Cargo> {
    return await this.cargoRepository.findOne({
      where: {
        nombre,
      },
      relations: ['usuarios']
    });
  }

  async spawnCargos(): Promise<void>{

    //Crea los cargos durante la primera ejecución del programa.
    const cargo = ["Empleado", "Administrador", "Gerente"]
    let cargoSeleccionado: Cargo
    let convertirDto: CargoDto = {"nombre": ''}

    for (let i=0; i<3; i++){
      cargoSeleccionado = await this.getCargoByNombre(cargo[i])
      if(!cargoSeleccionado){

        convertirDto.nombre = cargo[i]
        console.log(convertirDto)
        await this.createCargo(convertirDto)
      }else{
        console.log("El cargo: ",cargo[i], " ya existía en la BDD")
      }
    }
  }

  async spawnGerente(): Promise<void>{
    let datosGerente: CreateUsuarioDto={
      "cedula": "000000",
      "username": "admin",
      "password": "zeus",
      "nombre": "sysprop",
      "cargo": 3,
      "correo": "carlsgutierrez259@gmail.com",
      "fechaNacimiento": new Date(Date.parse("2002-12-26"))
    }

    const buscarGerente = await this.getUsuarioByUsername(datosGerente.username)
    if(!buscarGerente){
      const cargoGerente = await this.getCargoById(datosGerente.cargo)
      await this.createUsuario(datosGerente, cargoGerente)
    } else {
      console.log("Ya había un gerente registrado en esta BDD")
    }

  }

  async getUsuarioByUsername(username: string): Promise<Usuario | undefined> {
    return await this.usuariosRepository.findOne({
      where: {
        username,
      },
      relations: ["cargo"]
    });
  }

  async getUsuarioByCedula(cedula: string): Promise<Usuario | undefined> {
    return await this.usuariosRepository.findOne({
      where: {
        cedula,
      },
      relations: ["cargo"]
    });
  }

}
