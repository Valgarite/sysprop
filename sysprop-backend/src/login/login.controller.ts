import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private loginService: LoginService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: loginDto){
        return this.loginService.login(loginDto.username, loginDto.password)
    }
}
