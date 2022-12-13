import { UserEntity } from '@/entities/user.entity';
import { Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { buildUser } from './builders';
import { UserRegistrationValidator } from './user-register-request.validator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly userRegistrationValidator: UserRegistrationValidator
    ) {}

  @Post('register')
  public async registerUser(@Req() req): Promise<void> {
    const userData = req.body;
    const userDto = await this.userRegistrationValidator.validateUserInRequest(userData)
    const builtUser = buildUser(userDto);

    await this.userService.registerUser(builtUser);
  }
  @Get('hitmensAndManagers')
  public async getHitmensAndManagers(): Promise<UserEntity[]> {
    return await this.userService.getHitmensAndManager();
  }

  @Get('hitmens')
  public async getHitmens(): Promise<UserEntity[]> {
    return await this.userService.getHitmens();
  }

  @Put('markAsNonActive')
  public async updateHitmanStatus(@Req() req): Promise<void> {
    const { newStatus, hitmanId } = req.body;
    await this.userService.updateHitmanStatus(newStatus, hitmanId);
  }

  @Get('getHitmanById/:hitmanId')
  public async getHitmanById(
    @Param('hitmanId') hitmanId: string,
  ): Promise<UserEntity> {
    const hitman = await this.userService.getHitmanById(hitmanId);
    return hitman;
  }

  @Get('getAssociatedHitmans/:userId')
  public async getAssociatedHitmans(
    @Param('userId') userId: string,
  ): Promise<UserEntity[] | []> {
    return await this.userService.getAssociatedHitman(userId);
  }
}
