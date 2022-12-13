import { HitEntity } from '@/entities/hit.entity';

export interface UserTypesStrategy {
  update(hitId: string): Promise<HitEntity[] | HitEntity[]>;
}
