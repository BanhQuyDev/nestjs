import { JwtPayload } from './jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';
const bcrypt = require('bcrypt');
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
  async signIn(account: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = account;
    const user = await this.usersRepository.findOne({ where: { username } });
    const check = bcrypt.compareSync(password, user.password);
    if (user && check) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Username or password is wrong!!');
    }
  }
}
