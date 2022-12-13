import { UserHitsStrategy } from './hits-user-types.strategy';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { HitEntity } from '@/entities/hit.entity';
import { ErrorWithNested } from '@/application/ErrorWithNested';

export class HitmanHitsStrategy implements UserHitsStrategy {
  constructor(
    @Inject('HitEntityRepository')
    private readonly hitsRepository: Repository<HitEntity>,
  ) {}
  async getHits(userId: string): Promise<HitEntity[]> {
    try {
      const PARSED_USER_ID = Number(userId);
      return await this.hitsRepository.find({
        where: {
          userId: PARSED_USER_ID,
          isActive: true,
        },
      });
    } catch (error) {
      throw ErrorWithNested.new(
        `Error while finding hits: ${error.message}`,
        error,
      );
    }
  }
}
