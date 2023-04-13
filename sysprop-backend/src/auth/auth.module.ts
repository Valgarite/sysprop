import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/api-key.guard';

@Module({
  imports: [
    UsuariosModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '72000s' }
  }),
],
  providers: [AuthService, {provide: APP_GUARD, useClass: AuthGuard}],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
