import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@/config/config.service';
import { DatabaseConfig } from '@/database/database.config';
import { UserEntity } from '@/entities/user.entity';
import { UsersSeeder } from './users.seeder';

const dbConfig = new DatabaseConfig(new ConfigService());

seeder({
  imports: [
    TypeOrmModule.forRoot(dbConfig.connection()),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [ConfigService],
}).run([UsersSeeder]);
