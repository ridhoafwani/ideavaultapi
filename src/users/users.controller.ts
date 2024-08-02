import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dtos/signup.dto';
import { SigninDto } from './dtos/signin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  async signup(@Body() user: SignupDto) {
    return await this.userService.create(user);
  }

  @Post('signin')
  async login(@Body() user: SigninDto) {
    return await this.userService.login(user);
  }
}
