import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { HitsController } from '@/hits/hits.controller';
import { HitsService } from '@/hits/hits.service';
import { BossHitsStrategy } from './boss-hits.strategy';
import { HitmanHitsStrategy } from './hitman-hits.strategy';
import { ManagerHitsStrategy } from './manager-hits.strategy';
import { UsersModule } from '@/users/users.module';
import { UserHitsPipe } from './user-hits.pipe';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [
    HitsService,
    BossHitsStrategy,
    HitmanHitsStrategy,
    ManagerHitsStrategy,
    UserHitsPipe,
  ],
  controllers: [HitsController],
  exports: [HitsService, UserHitsPipe],
})
export class HitsModule {}
