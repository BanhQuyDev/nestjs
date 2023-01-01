import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('/sign-up')
  signUp(@Body() account: AuthCredentialsDto): Promise<string> {
    return this.auth.signUp(account);
  }
  @Post('/sign-in')
  signIn(
    @Body() account: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.auth.signIn(account);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
