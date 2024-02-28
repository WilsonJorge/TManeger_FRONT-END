import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoryTables1697528681957 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          {
            name: 'id', // Add id as the primary key
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'categoria',
            type: 'varchar',
          },
          {
            name: 'numeroCategoria',
            type: 'integer',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('category');
  }
}
