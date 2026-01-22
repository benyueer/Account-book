import type { MigrationInterface, QueryRunner } from 'typeorm'

export class Trans11769069285626 implements MigrationInterface {
  name = 'Trans11769069285626'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."transactions_transactiontype_enum" AS ENUM('income', 'expense')`)
    await queryRunner.query(`CREATE TYPE "public"."transactions_paymentmethod_enum" AS ENUM('cash', 'alipay', 'wechat', 'bankCard', 'creditCard', 'other')`)
    await queryRunner.query(`CREATE TYPE "public"."transactions_transactionstatus_enum" AS ENUM('pending', 'completed', 'failed', 'cancelled')`)
    await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transactionTime" TIMESTAMP NOT NULL, "transactionCategory" character varying, "transactionType" "public"."transactions_transactiontype_enum" NOT NULL, "counterparty" character varying, "counterpartyAccount" character varying, "productDescription" text, "amount" numeric(10,2) NOT NULL, "paymentMethod" "public"."transactions_paymentmethod_enum", "transactionStatus" "public"."transactions_transactionstatus_enum" NOT NULL DEFAULT 'completed', "transactionOrderNumber" character varying, "merchantOrderNumber" character varying, "notes" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_234ec34019735bebab127734b81" UNIQUE ("transactionOrderNumber"), CONSTRAINT "UQ_5e696af2d1246c7701d019c4ed8" UNIQUE ("merchantOrderNumber"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id")); COMMENT ON COLUMN "transactions"."transactionTime" IS '交易时间'; COMMENT ON COLUMN "transactions"."transactionCategory" IS '交易分类/交易类型'; COMMENT ON COLUMN "transactions"."transactionType" IS '收/支'; COMMENT ON COLUMN "transactions"."counterparty" IS '交易对方'; COMMENT ON COLUMN "transactions"."counterpartyAccount" IS '对方账号'; COMMENT ON COLUMN "transactions"."productDescription" IS '商品说明/商品'; COMMENT ON COLUMN "transactions"."amount" IS '金额/金额(元)'; COMMENT ON COLUMN "transactions"."paymentMethod" IS '收/付款方式/支付方式'; COMMENT ON COLUMN "transactions"."transactionStatus" IS '交易状态/当前状态'; COMMENT ON COLUMN "transactions"."transactionOrderNumber" IS '交易订单号/交易单号'; COMMENT ON COLUMN "transactions"."merchantOrderNumber" IS '商家订单号/商户单号'; COMMENT ON COLUMN "transactions"."notes" IS '备注'; COMMENT ON COLUMN "transactions"."createdAt" IS '创建时间'; COMMENT ON COLUMN "transactions"."updatedAt" IS '更新时间'`)
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`)
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`)
    await queryRunner.query(`DROP TABLE "transactions"`)
    await queryRunner.query(`DROP TYPE "public"."transactions_transactionstatus_enum"`)
    await queryRunner.query(`DROP TYPE "public"."transactions_paymentmethod_enum"`)
    await queryRunner.query(`DROP TYPE "public"."transactions_transactiontype_enum"`)
  }
}
