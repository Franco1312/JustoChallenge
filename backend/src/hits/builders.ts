import { HitEntity } from '@/entities/hit.entity';
import { HitInRequest } from '.';
export function buildHit(content: HitInRequest): Partial<HitEntity> {
  return new HitEntity({
    userId: Number(content.userId),
    assignee: content.assignee,
    description: content.description,
    target_name: content.targetName,
    status: content.status,
    hit_creator: content.hitCreator,
    isActive: content.isActive,
  });
}
