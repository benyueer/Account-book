import { MigrationInterface, QueryRunner } from "typeorm";

export class TransNoUno1773211135749 implements MigrationInterface {
    name = 'TransNoUno1773211135749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "UQ_234ec34019735bebab127734b81"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "UQ_5e696af2d1246c7701d019c4ed8"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "UQ_5e696af2d1246c7701d019c4ed8" UNIQUE ("merchantOrderNumber")`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "UQ_234ec34019735bebab127734b81" UNIQUE ("transactionOrderNumber")`);
    }

}
