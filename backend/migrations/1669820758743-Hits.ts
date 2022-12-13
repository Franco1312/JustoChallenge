import { TableOptions } from 'typeorm/schema-builder/options/TableOptions';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Hits1669820758743 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const hit = {
            name: 'hits',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'fk_user',
                    type: 'int',
                },
                {
                    name: 'assignee',
                    type: 'varchar',
                    length: 36,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: 36,
                },
                {
                    name: 'target_name',
                    type: 'varchar',
                    length: 36,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: 36,
                },
                {
                    name: 'hit_creator',
                    type: 'varchar',
                    length: 36,
                },
                {
                    name: 'is_active',
                    type: 'bool',
                    default: true,
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

        await queryRunner.createTable(new Table(hit), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user');
    }
}
