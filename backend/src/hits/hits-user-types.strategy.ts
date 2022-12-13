import { HitEntity } from '@/entities/hit.entity';

export interface UserHitsStrategy {
  getHits(userId: string): Promise<HitEntity[] | HitEntity[]>;
}
