import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSourceToTransaction1773218368270 implements MigrationInterface {
    name = 'AddSourceToTransaction1773218368270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transactions_source_enum" AS ENUM('微信导入', '支付宝导入', '导入', '手动添加')`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "source" "public"."transactions_source_enum"`);
        await queryRunner.query(`COMMENT ON COLUMN "transactions"."source" IS '来源'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "transactions"."source" IS '来源'`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "source"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_source_enum"`);
    }

}
