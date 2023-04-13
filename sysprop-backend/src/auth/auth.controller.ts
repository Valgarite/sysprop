import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { signInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: signInDto){
        return this.authService.signIn(signInDto.username, signInDto.password)
    }
}
