import { UserEntity } from '@/entities/user.entity';
import { UserToAuth } from '@/auth/index';
import { HttpException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

export class AuthService {
  constructor(
    @Inject('UserEntityRepository')
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async authenticate(userDto: UserToAuth): Promise<UserEntity> {
    const { email, password } = userDto;

    const foundedUser = await this.userRepository.findOne({
      where: { email },
    });

    const validatedUser = await this.validate(foundedUser, password);
    return validatedUser as UserEntity;
  }

  private async validate(
    foundedUser: UserEntity,
    password: string,
  ): Promise<UserEntity> {
    if (!foundedUser) {
      throw new HttpException('USER_NOT_FOUND', 404);
    }

    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    const isValid = hashedPassword === foundedUser.password;

    if (!isValid) throw new HttpException('INCORRECT_PASSWORD', 403);

    if (!foundedUser.isActive) {
      throw new HttpException('UNAUTHORIZED', 401);
    }

    return foundedUser;
  }
}
