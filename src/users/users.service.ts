import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dtos/signin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(signUpDto: SignupDto) {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    const createdUser = await this.repository.save(user);

    const accessToken = this.generateJWT({
      sub: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    });
    return {
      message: 'registered successfully',
      accessToken: accessToken,
    };
  }

  async login(signInDto: SigninDto) {
    const { email, password } = signInDto;
    const user = await this.repository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }
    const accessToken = this.generateJWT({
      sub: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      message: 'logged in successfully',
      accessToken: accessToken,
    };
  }

  generateJWT(payload: any) {
    return this.jwtService.sign(payload);
  }
}
