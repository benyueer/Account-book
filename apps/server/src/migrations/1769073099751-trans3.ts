import type { MigrationInterface, QueryRunner } from 'typeorm'

export class Trans31769073099751 implements MigrationInterface {
  name = 'Trans31769073099751'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transactions" ADD "sourceCard" text`)
    await queryRunner.query(`COMMENT ON COLUMN "transactions"."sourceCard" IS '来源银行卡'`)
    await queryRunner.query(`ALTER TABLE "transactions" ADD "deleteAt" TIMESTAMP`)
    await queryRunner.query(`COMMENT ON COLUMN "transactions"."deleteAt" IS '删除时间'`)
    await queryRunner.query(`ALTER TYPE "public"."transactions_transactiontype_enum" RENAME TO "transactions_transactiontype_enum_old"`)
    await queryRunner.query(`CREATE TYPE "public"."transactions_transactiontype_enum" AS ENUM('income', 'expense', 'noCount')`)
    await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "transactionType" TYPE "public"."transactions_transactiontype_enum" USING "transactionType"::"text"::"public"."transactions_transactiontype_enum"`)
    await queryRunner.query(`DROP TYPE "public"."transactions_transactiontype_enum_old"`)
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "paymentMethod"`)
    await queryRunner.query(`DROP TYPE "public"."transactions_paymentmethod_enum"`)
    await queryRunner.query(`ALTER TABLE "transactions" ADD "paymentMethod" character varying`)
    await queryRunner.query(`COMMENT ON COLUMN "transactions"."paymentMethod" IS '收/付款方式/支付方式'`)
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "transactionStatus"`)
    await queryRunner.query(`DROP TYPE "public"."transactions_transactionstatus_enum"`)
    await queryRunner.query(`ALTER TABLE "transactions" ADD "transactionStatus" character varying NOT NULL DEFAULT 'completed'`)
    await queryRunner.query(`COMMENT ON COLUMN "transactions"."transactionStatus" IS '交易状态/当前状态'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "transactions"."transactionStatus" IS '交易状态/当前状态'`)
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "transactionStatus"`)
    await queryRunner.query(`CREATE TYPE "public"."transactions_transactionstatus_enum" AS ENUM('pending', 'completed', 'failed', 'cancelled')`)
    await queryRunner.query(`ALTER TABLE "transactions" ADD "transactionStatus" "public"."transactions_transactionstatus_enum" NOT NULL DEFAULT 'completed'`)
    await queryRunner.query(`COMMENT ON COLUMN "transactions"."paymentMethod" IS '收/付款方式/支付方式'`)
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "paymentMethod"`)
    await queryRunner.query(`CREATE TYPE "public"."transactions_paymentmethod_enum" AS ENUM('cash', 'alipay', 'wechat', 'bankCard', 'creditCard', 'other')`)
    await queryRunner.query(`ALTER TABLE "transactions" ADD "paymentMethod" "public"."transactions_paymentmethod_enum"`)
    await queryRunner.query(`CREATE TYPE "public"."transactions_transactiontype_enum_old" AS ENUM('income', 'expense')`)
    await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "transactionType" TYPE "public"."transactions_transactiontype_enum_old" USING "transactionType"::"text"::"public"."transactions_transactiontype_enum_old"`)
    await queryRunner.query(`DROP TYPE "public"."transactions_transactiontype_enum"`)
    await queryRunner.query(`ALTER TYPE "public"."transactions_transactiontype_enum_old" RENAME TO "transactions_transactiontype_enum"`)
    await queryRunner.query(`COMMENT ON COLUMN "transactions"."deleteAt" IS '删除时间'`)
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "deleteAt"`)
    await queryRunner.query(`COMMENT ON COLUMN "transactions"."sourceCard" IS '来源银行卡'`)
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "sourceCard"`)
  }
}
