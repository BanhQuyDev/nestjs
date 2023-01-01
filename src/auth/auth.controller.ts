import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService){};
  @Post("/sign-up")
  signUp(@Body() account:AuthCredentialsDto): Promise<string>{
    return this.auth.signUp(account);
  }
  @Get("/sign-in")
  signIn(@Body() account:AuthCredentialsDto): Promise<string>{
    return this.auth.signIn(account);
  }
}
