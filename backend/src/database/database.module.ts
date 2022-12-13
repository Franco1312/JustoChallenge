import { Module, Global, FactoryProvider } from '@nestjs/common';
import { createConnection, Connection, Repository, ObjectType } from 'typeorm';
import { ConfigService } from '@/config/config.service';
import { ConfigModule } from '@/config/config.module';
import { DatabaseConfig } from '@/database/database.config';
import { UserEntity } from '@/entities/user.entity';
import { HitEntity } from '@/entities/hit.entity';

const entityProvider = <T>(entity: ObjectType<T>): FactoryProvider => ({
  provide: `${entity.name.toString()}Repository`,
  useFactory: (connection: Connection): Repository<T> =>
    connection.getRepository(entity),
  inject: ['DATABASE_CONNECTION'],
});

const entityProviders = [entityProvider(UserEntity), entityProvider(HitEntity)];

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (configService: ConfigService): Promise<Connection> => {
        return createConnection(new DatabaseConfig(configService).connection());
      },
      inject: [ConfigService],
    },
    ...entityProviders,
  ],
  imports: [ConfigModule],
  exports: ['DATABASE_CONNECTION', ...entityProviders.map((p) => p.provide)],
})
export class DatabaseModule {}
