import { TableOptions } from 'typeorm/schema-builder/options/TableOptions';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1669821065512 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const user = {
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isUnique: true
                },
                {
                    name: 'uuid',
                    type: 'varchar',
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'fk_manager',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'type',
                    type: 'varchar',
                    length: 36,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: 36,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: 36,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: 265,
                },
                {
                    name: 'is_active',
                    type: 'bool',
                    default: true
                },
                {
                    type: 'TIMESTAMP',
                    name: 'created_at',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    type: 'TIMESTAMP',
                    name: 'updated_at',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                }
            ] as TableColumnOptions[],
            engine: 'InnoDB',
        } as TableOptions;

        await queryRunner.createTable(new Table(user), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user');
    }
}
