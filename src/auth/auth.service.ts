import { UsersRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {JwtService} from '@nestjs/jwt'
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(account: AuthCredentialsDto): Promise<string> {
    return this.usersRepository.signUp(account);
  }
  async signIn(account: AuthCredentialsDto): Promise<string>{
    return this.usersRepository.signIn(account);
  }
}
