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
import { bootStrapService } from './on-bootstrap.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { BackupModule } from './backup/backup.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth:{
          user: 'sysprop123@gmail.com', // Tu dirección de correo electrónico
          pass: 'moifouskfrlkgpvw', // Tu contraseña de correo electrónico
        }
      }

    }),
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
      timezone: "+04:00",
      //dropSchema: true
    }),
    UsuariosModule,
    ArticulosModule,
    VentasModule,
    ClientesModule,
    ComprasModule,
    ProveedoresModule,
    BackupModule
  ],
  controllers: [AppController],
  providers: [AppService, bootStrapService],
})
export class AppModule {}
