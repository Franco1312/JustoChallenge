import { Not, Repository } from 'typeorm';
import { UserEntity } from '@/entities/user.entity';
import { HttpException, Inject } from '@nestjs/common';
import { UserTypes } from '@/entities';
import { ErrorWithNested } from '@/application/ErrorWithNested';

export class UsersService {
  constructor(
    @Inject('UserEntityRepository')
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async registerUser(userDto: Partial<UserEntity>): Promise<void> {
    const { email } = userDto;
    const existentUser = await this.userRepository.find({
      where: { email },
    });

    if (existentUser.length > 0) {
      throw new HttpException('USER_ALREADY_EXISTS', 403);
    }
    await this.userRepository.save(userDto);
  }

  public async updateHitmanStatus(
    newStatus: boolean,
    hitmanId: number,
  ): Promise<void> {
    let hitManToUpdate = await this.userRepository.findOne({
      where: { id: hitmanId },
    });
    try {
      hitManToUpdate.isActive = newStatus;

      await this.userRepository.save(hitManToUpdate);
    } catch (error) {
      throw ErrorWithNested.new(
        `Error while updating hitman status: ${error.message}`,
        error,
      );
    }
  }

  public async getHitmens(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: { type: UserTypes.HITMAN },
    });
  }

  public async getHitmanById(hitmanId: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id: Number(hitmanId),
        type: UserTypes.HITMAN,
      },
    });
  }

  public async getAssociatedHitman(userId: string): Promise<UserEntity[] | []> {
    const foundedAssociatedHitmans = await this.userRepository.find({
      where: { manager: Number(userId) },
      relations: ['manager']
    });
    return foundedAssociatedHitmans.length > 0 ? foundedAssociatedHitmans : [];
  }

  public async update(hitmanId: string, newStatus: boolean) {
    const foundedHitman = await this.userRepository.findOne({
      where: { id: Number(hitmanId) },
    });
    if (foundedHitman) {
      foundedHitman.isActive = newStatus;
      try {
        await this.userRepository.save(foundedHitman);
      } catch (error) {
        throw ErrorWithNested.new(
          `Error while updating hitman status: ${error.message}`,
          error,
        );
      }
    }
  }

  public async getHitmensAndManager(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: { type: Not(UserTypes.BOSS) },
      relations: ['manager']
    });
  }
}
