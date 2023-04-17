import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/crear-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Cargo } from 'src/entities/cargo.entity';
import { CargoDto } from './dto/cargo.dto';
import  * as nodemailer from 'nodemailer'
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,

    @InjectRepository(Cargo)
    private cargoRepository: Repository<Cargo>,
    private readonly mailerService: MailerService
  ) { }

  async buscarPorCorreo(entrada):Promise<Usuario>{
    console.log(entrada)
    const correo = entrada
    const correoEncontrado = await this.usuariosRepository.findOne({
      where: {correo: correo},
    })
    if(correoEncontrado){
      return correoEncontrado
    }
    else return null
  }

  async buscarUsuarioPorCorreo(entrada):Promise<Usuario>{
    console.log(entrada)
    const correo = entrada
    const correoEncontrado = await this.usuariosRepository.findOne({
      select:{correo: true},
      where: {correo: correo},
    })
    console.log(correoEncontrado)

    if(correoEncontrado){
      return correoEncontrado
    }
  }
  
  async sendEmail(
    to: string,
    subject: string,
    variable: any,
  ): Promise<void> {
    // Crea un objeto de transporte de correo
    const transporter = nodemailer.createTransport({
      // Configura los detalles del servidor de correo
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'sysprop123@gmail.com', // Tu dirección de correo electrónico
        pass: 'moifouskfrlkgpvw', // Tu contraseña de correo electrónico
      },
    });
      console.log("enviado a ", to) 
      const destinatario = to
    // Configura los detalles del correo electrónico
    const mailOptions = {
      from: 'sysprop123@gmail.com', // Tu dirección de correo electrónico
      to: destinatario, // Dirección de correo electrónico del destinatario
      subject, // Asunto del correo electrónico
      html: `<h1 style="text-align:center">Bienvenido</h1>
      <p style="text-align:center">Se le ha asignado la siguiente contraseña:</p>
      <input value="${variable}" style="display:block; margin:0 auto; padding:10px; font-size:16px; text-align:center" disabled>`, // Cuerpo del correo electrónico (puedes usar HTML)
    };
    // Envía el correo electrónico
    await transporter.sendMail(mailOptions).catch();

    //Realiza el cambio en la BDD
    const cambio = {
      "password": variable
    }
    const usuarioCambio = await this.buscarUsuarioPorCorreo(to)
    await this.updateUsuario(usuarioCambio.id, cambio)
  }
  

  async getAllUsuarios(): Promise<Usuario[]> {
    return await this.usuariosRepository.find({ relations: ["cargo"] });
  }
  async createUsuario(nuevoUsuario: CreateUsuarioDto, cargo: Cargo): Promise<Usuario> {

    const usuario = new Usuario()

    usuario.fechaNacimiento = nuevoUsuario.fechaNacimiento;
    usuario.nombre = nuevoUsuario.nombre;
    usuario.correo = nuevoUsuario.correo;

    const validarUser = await this.getUsuarioByUsername(nuevoUsuario.username)
    if(!validarUser){
      usuario.username = nuevoUsuario.username;
      const validarCedula = await this.getUsuarioByCedula(nuevoUsuario.cedula)
      if(!validarCedula){
        usuario.cedula = nuevoUsuario.cedula
      }
      else{throw new HttpException('Cedula repetida', HttpStatus.CONFLICT)}
    }else{throw new HttpException('Usuario repetido', HttpStatus.CONFLICT)}
    
    //const hashPassword = bcrypt.hash(nuevoUsuario.password, 10)
    //usuario.password = await hashPassword;
    usuario.password = nuevoUsuario.password

    const usuarioGuardado = await this.usuariosRepository.save(usuario)

    cargo.usuarios = [usuarioGuardado, ...cargo.usuarios]
    await cargo.save()

    //delete usuarioGuardado.password
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
    const cargo = await this.getCargoByNombre(updateUsuario.cargoNombre);
    
    const usuario = await this.getUsuarioById(id);
    const usuarioActualizado = this.usuariosRepository.merge(usuario, updateUsuario);
    usuarioActualizado.cargo = cargo;
    
    return await this.usuariosRepository.save(usuarioActualizado);
  }
  

  async desactivarUsuario(id: any): Promise<void> {
    const usuario = await this.getUsuarioById(id);
    const viejo = usuario
    if(usuario.estado_activo){
      usuario.estado_activo = false
      
    }else{
      usuario.estado_activo = true
    }
    const mezcla = await this.usuariosRepository.merge(viejo, usuario)
    const resultado = await this.usuariosRepository.save(mezcla);
    console.log(resultado)
  }

  async deleteUsuario(id: any): Promise<void> {
    await this.usuariosRepository.delete(id);
  }

  //en crearusuarios, añadir el revisar si el nombre de usuario está ocupado
  async login(user: string, pass: string, intentos: number){
    const busquedaUsuario = await this.getUsuarioByUsername(user)
    
    if(busquedaUsuario){
      const busquedaContraseña: Usuario = await this.usuariosRepository.findOneBy({'password': pass, 'username': user})
      if(intentos>0){
        if(busquedaContraseña){
          const respuesta = busquedaUsuario

          if(respuesta.estado_activo){
            const user = {
              username: respuesta.username,
              nombre: respuesta.nombre,
              cedula: respuesta.cedula,
              correo: respuesta.correo,
              estado_activo: respuesta.estado_activo
            }
            return {
              user,
              statusCode: HttpStatus.OK
            }
          } else{throw new UnauthorizedException("Su usuario está bloqueado del sistema.")}
        } else {throw new UnauthorizedException("Contraseña incorrecta.")}
      } else {
        void this.bloquearUsuario(user)
        throw new UnauthorizedException("Sin intentos disponibles, ha sido bloqueado del sistema durante 5 segundos.")}
    } else {throw new UnauthorizedException("Usuario incorrecto o inexistente.")}
  }

  async bloquearUsuario(user: string){
    const usuario = await this.getUsuarioByUsername(user)
    if (usuario.estado_activo){
      await this.desactivarUsuario(usuario.id)
      await new Promise(resolve => setTimeout(resolve,3600000))
      if((!(await this.getUsuarioByUsername(user)).estado_activo)){
        await this.desactivarUsuario(usuario.id)
      }
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

  // async login(user: string, pass: string){
  //   const busquedaUsuario = await this.usuariosRepository.findOneBy({'username': user})
  //   if(busquedaUsuario){
  //     const busquedaContraseña = await this.usuariosRepository.findOneBy({'username': user, 'password': pass})

  //     if(busquedaContraseña){
  //       const respuesta = busquedaUsuario

  //       if (respuesta.estado_activo){
  //         return busquedaUsuario
  //       } else{
  //         return({"respuesta": "Usuario bloqueado"})
  //       }
  //     } else {
  //       return ({"respuesta": "Contraseña incorrecta"})
  //     }
  //   } else {
  //     return ({"respuesta": "No existe ese usuario"})
  //   }
  // }

}
