import { DatabaseConnectionOptions } from '@/config';
import { ConfigService } from '@/config/config.service';
import { ConnectionOptions } from 'typeorm';

export class DatabaseConfig {
  constructor(private readonly config: ConfigService) {}

  public connection(): ConnectionOptions {
    const mySqlConnection = this.getMysqlConnection();

    return {
      ...mySqlConnection,
      entities: [`${__dirname}/../entities/*.entity{.ts,.js}`],
    };
  }

  private getMysqlConnection(): DatabaseConnectionOptions {
    return {
      type: 'mysql',
      host: this.config.getDatabaseHost(),
      username: this.config.getDatabaseUsername(),
      password: this.config.getDatabasePassword(),
      database: this.config.getDatabaseName(),
      port: parseInt(this.config.getDatabasePort()),
      synchronize: false,
      migrationsRun: true,
    } as DatabaseConnectionOptions;
  }
}
