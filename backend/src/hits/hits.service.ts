import { ErrorWithNested } from 'src/application/ErrorWithNested';
import { HitEntity } from '@/entities/hit.entity';
import { In, Repository } from 'typeorm';
import { HttpException, Inject } from '@nestjs/common';
import { UserEntity } from '@/entities/user.entity';
import { UserHitsStrategy } from './hits-user-types.strategy';
import { HitStatus, UserTypes } from '@/entities';
import { BossHitsStrategy } from './boss-hits.strategy';
import { ManagerHitsStrategy } from './manager-hits.strategy';
import { HitmanHitsStrategy } from './hitman-hits.strategy';

export class HitsService {
  public userHitsStrategies: Map<string, UserHitsStrategy>;
  constructor(
    @Inject('UserEntityRepository')
    private readonly usersRepository: Repository<UserEntity>,
    @Inject('HitEntityRepository')
    private readonly hitsRepository: Repository<HitEntity>,
    private readonly bossHitsStrategy: BossHitsStrategy,
    private readonly managerHitsStrategy: ManagerHitsStrategy,
    private readonly hitmanHitsStrategy: HitmanHitsStrategy,
  ) {
    this.userHitsStrategies = new Map<string, UserHitsStrategy>([
      [UserTypes.BOSS, bossHitsStrategy],
      [UserTypes.MANAGER, managerHitsStrategy],
      [UserTypes.HITMAN, hitmanHitsStrategy],
    ]);
  }

  public async createHit(hitDto: Partial<HitEntity>): Promise<void> {
    const userRelatedHit = await this.makeUserHitRelationByUsername(
      hitDto.userId,
      hitDto,
    );
    try {
      await this.hitsRepository.save(userRelatedHit);
    } catch (error) {
      throw ErrorWithNested.new(
        `Error while saving hits: ${error.message}`,
        error,
      );
    }
  }

  public async getHitById(hitId: string): Promise<HitEntity> {
    const foundedHit = await this.hitsRepository.findOne({
      where: { id: Number(hitId) },
    });

    if (!foundedHit) {
      throw new HttpException('NOT FOUNDED HIT WITH THAT ID', 404);
    }
    return foundedHit;
  }

  private async makeUserHitRelationByUsername(
    userId: number,
    hit: Partial<HitEntity>,
  ) {
    const foundedUser = await this.usersRepository.findOne({
      where: { id: userId, isActive: true },
    });
    if (foundedUser) {
      hit.assignee = foundedUser.username;
      hit.hit_creator = foundedUser.username;
    } else {
      throw new HttpException('NON-EXISTENT OR NON-ACTIVE USER', 404);
    }
    return hit;
  }


  public async update(
    hitId: string,
    newStatus: Partial<HitStatus>,
    newAssigne: string,
  ): Promise<void> {
    const parsedHitId = Number(hitId);
    if (newStatus) {
      await this.updateHitStatus(parsedHitId, newStatus);
    }

    if (newAssigne) {
      await this.updateHitAssigne(parsedHitId, newAssigne);
    }
  }

  private async updateHitStatus(hitId: number, newStatus: Partial<HitStatus>) {
    let hitToUpdate = await this.hitsRepository.findOne({
      where: { id: hitId },
    });

    hitToUpdate.status = newStatus;
    return await this.hitsRepository.save(hitToUpdate);
  }

  private async updateHitAssigne(
    hitId: number,
    newAssigne: string,
  ): Promise<void> {
    const [username, newAssigneId] = newAssigne.split('-');

    let hitToUpdate = await this.hitsRepository.findOne({
      where: {
        id: hitId,
        status: HitStatus.ASSIGNED,
        isActive: true,
      },
    });

    if (!hitToUpdate) {
      throw new HttpException('NOT FOUNDED HITS TO UPDATE', 404);
    }

    const newUserToAssing = await this.usersRepository.findOne({
      where: { id: Number(newAssigneId) },
    });

    hitToUpdate.assignee = newUserToAssing.username;
    hitToUpdate.userId = newUserToAssing.id;

    try {
      await this.hitsRepository.save(hitToUpdate);
    } catch (error) {
      throw ErrorWithNested.new(
        `Error while saving hit: ${error.message}`,
        error,
      );
    }
  }
}
