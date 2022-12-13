import { config, parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor() {
    config();
    this.envConfig = { ...process.env, ...parse };
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getDatabaseHost(): string {
    return this.get('DB_HOST');
  }

  getDatabaseUsername(): string {
    return this.get('DB_USERNAME');
  }

  getDatabasePassword(): string {
    return this.get('DB_PASSWORD');
  }

  getDatabaseName(): string {
    return this.get('DB_DATABASE');
  }

  getDatabasePort(): string {
    return this.get('DB_PORT');
  }
}
