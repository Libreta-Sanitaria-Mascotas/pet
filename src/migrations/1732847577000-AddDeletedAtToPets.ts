import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDeletedAtToPets1732847577000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pets',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pets', 'deleted_at');
  }
}
