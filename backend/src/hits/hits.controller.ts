import { Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { HitEntity } from '@/entities/hit.entity';
import { HitsService } from './hits.service';
import { buildHit } from '@/hits/builders';
import { UserHitsPipe } from './user-hits.pipe';

@Controller('/hits')
export class HitsController {
  constructor(private readonly hitsService: HitsService) {}

  @Get(':userId')
  public async getUserHits(
    @Param('userId', UserHitsPipe) hit: HitEntity[],
  ): Promise<HitEntity[]> {
    return hit;
  }

  @Get('getById/:hitId')
  public async getHitById(@Param('hitId') hitId: string): Promise<HitEntity> {
    return await this.hitsService.getHitById(hitId);
  }

  @Post('create')
  public async createHit(@Req() req): Promise<void> {
    const hitData = req.body;
    const builtHit = buildHit(hitData);
    await this.hitsService.createHit(builtHit);
  }

  @Put('update')
  public async update(@Req() req): Promise<void> {
    const hitData = req.body;
    await this.hitsService.update(
      hitData.hitId,
      hitData.status,
      hitData.assignee,
    );
  }
}
