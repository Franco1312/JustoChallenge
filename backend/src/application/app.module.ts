import { Module } from '@nestjs/common';
import { ApplicationStatusController } from '@/application/app.controller';
import { ConfigModule } from '@/config/config.module';
import { DatabaseModule } from '@/database/database.module';
import { HitsModule } from '@/hits/hits.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [DatabaseModule, HitsModule, ConfigModule, AuthModule, UsersModule],
  controllers: [ApplicationStatusController],
})
export class AppModule {}
