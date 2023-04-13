import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { UsuariosService } from "./usuarios/usuarios.service";

@Injectable()
export class bootStrapService implements OnApplicationBootstrap {
    constructor(
        private readonly usuariosService: UsuariosService 
    ){}

    onApplicationBootstrap() {
        console.log("XD")
        this.usuariosService.spawnCargos();
        this.usuariosService.spawnGerente();
    }
}