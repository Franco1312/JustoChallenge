import { Controller, Post, Req } from '@nestjs/common';
import { UserEntity } from '@/entities/user.entity';
import { UserValidator } from './auth-request.validator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userValidator: UserValidator,
  ) {}

  @Post('login')
  public async AuthenticateAndLogin(@Req() req): Promise<UserEntity> {
    const userInRequest = req.body;
    const userDto = await this.userValidator.validateUserInRequest(userInRequest)
    return this.authService.authenticate(userDto);
  }
}
