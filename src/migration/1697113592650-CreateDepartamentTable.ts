import { MigrationInterface, QueryRunner,Table } from "typeorm"
export class CreateDepartamentTable1697113592650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'departament',
              columns: [
                {
                  name: 'id', // Add id as the primary key
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'departamento',
                  type: 'varchar',
                },
                {
                    name: 'numeroColaboradores',
                    type: 'integer',
                  },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('departament');
    }

}
