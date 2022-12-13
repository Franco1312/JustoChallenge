import { HitEntity } from '@/entities/hit.entity';
import { UserEntity } from '@/entities/user.entity';
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { HitsService } from './hits.service';

@Injectable()
export class UserHitsPipe
  implements PipeTransform<string, Promise<HitEntity[]>>
{
  public constructor(
    @Inject('UserEntityRepository')
    private readonly usersRepository: Repository<UserEntity>,
    @Inject('HitEntityRepository')
    private readonly hitsRepository: Repository<HitEntity>,
    private readonly hitsService: HitsService,
  ) {}

  async transform(userId: string): Promise<HitEntity[]> {
    const PARSED_USER_ID = Number(userId);
    const foundedUser = await this.usersRepository.findOne({
      where: { id: PARSED_USER_ID },
    });

    const allHits = await this.hitsRepository.find({});
    if (!foundedUser) {
      return allHits;
    }
    const userTypesHitStrategy = this.hitsService.userHitsStrategies.get(
      foundedUser.type,
    );

    if (userTypesHitStrategy) {
      return userTypesHitStrategy.getHits(foundedUser.id.toString());
    }
  }
}
