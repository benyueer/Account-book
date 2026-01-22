import { MigrationInterface, QueryRunner } from "typeorm";

export class Trans21769072020039 implements MigrationInterface {
    name = 'Trans21769072020039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "userId" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "userId"`);
    }

}
