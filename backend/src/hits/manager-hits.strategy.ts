import { UserHitsStrategy } from './hits-user-types.strategy';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { HitEntity } from '@/entities/hit.entity';
import { ErrorWithNested } from '@/application/ErrorWithNested';
import { UserEntity } from '@/entities/user.entity';

export class ManagerHitsStrategy implements UserHitsStrategy {
  constructor(
    @Inject('HitEntityRepository')
    private readonly hitsRepository: Repository<HitEntity>,
    @Inject('UserEntityRepository')
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
  async getHits(userId: string): Promise<HitEntity[]> {
    try {
      const PARSED_USER_ID = Number(userId);
      let foundedHitsForUser;

      foundedHitsForUser = await this.hitsRepository.find({
        where: {
          userId: PARSED_USER_ID,
          isActive: true,
        },
      });

      if (!foundedHitsForUser.length) {
        const foundedHitmanBelogsManager = await this.usersRepository.find({
          where: {
            manager: PARSED_USER_ID,
            isActive: true,
          },
        });

        const foundedHits = await Promise.all(
          foundedHitmanBelogsManager.map(async (hitman) => {
            return await this.hitsRepository.find({
              where: {
                userId: hitman.id,
              },
            });
          }),
        );

        foundedHitsForUser = foundedHits[0];
      }

      return foundedHitsForUser;
    } catch (error) {
      throw ErrorWithNested.new(
        `Error while finding hits: ${error.message}`,
        error,
      );
    }
  }
}
