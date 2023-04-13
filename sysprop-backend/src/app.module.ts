import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VentasModule } from './ventas/ventas.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuariosModule } from './usuarios/usuarios.module';
import { ArticulosModule } from './articulos/articulos.module';
import { ClientesModule } from './clientes/clientes.module';
import { ComprasModule } from './compras/compras.module';
import { ProveedoresModule } from './proveedor/proveedor.module';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './config';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: parseInt(DB_PORT),
      username:DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      timezone: "+04:00"
    }),
    UsuariosModule,
    ArticulosModule,
    VentasModule,
    ClientesModule,
    ComprasModule,
    ProveedoresModule,
    AuthModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
