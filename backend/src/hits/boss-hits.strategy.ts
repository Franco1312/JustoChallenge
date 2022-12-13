import { UserHitsStrategy } from './hits-user-types.strategy';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { HitEntity } from '@/entities/hit.entity';

export class BossHitsStrategy implements UserHitsStrategy {
  constructor(
    @Inject('HitEntityRepository')
    private readonly hitsRepository: Repository<HitEntity>,
  ) {}
  async getHits(userId: string): Promise<HitEntity[]> {
    return this.hitsRepository.find();
  }
}
