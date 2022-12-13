import { TableOptions } from 'typeorm/schema-builder/options/TableOptions';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export const appendTimestamps = (
  table: TableOptions,
  withSoftDelete = false,
  type = 'datetime'
): void => {
  table.columns = table.columns.concat([
    {
      type,
      name: 'created_at',
      isNullable: false,
      default: 'CURRENT_TIMESTAMP',
    },
    {
      type,
      name: 'updated_at',
      isNullable: false,
      default: 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    },
  ] as TableColumnOptions[]);

  if (withSoftDelete) {
    table.columns.push({
      type,
      name: 'deleted_at',
      isNullable: true,
      default: null,
    } as TableColumnOptions);
  }
};
