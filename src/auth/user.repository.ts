import {
  ConflictException,
  InternalServerErrorException,

} from '@nestjs/common';
import { CustomRepository } from 'src/typeorm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
const bcrypt = require('bcrypt');
@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(account: AuthCredentialsDto): Promise<string> {
    const { username, password } = account;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = this.create({ username, password: hashPassword });
    let message: string;
    try {
      await this.save(user);
      message = 'Sign Up Successfully !!!';
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return message;
  }
}
