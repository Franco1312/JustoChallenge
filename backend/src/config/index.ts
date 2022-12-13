import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export class DatabaseConnectionOptions implements MysqlConnectionOptions {
  readonly type: 'mysql';
}
