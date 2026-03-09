import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCardsTable1773045609778 implements MigrationInterface {
    name = 'AddCardsTable1773045609778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cards_cardtype_enum" AS ENUM('debit', 'credit')`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bankName" character varying NOT NULL, "bankLogo" character varying, "lastFourDigits" character varying(4) NOT NULL, "balance" numeric(12,2) NOT NULL DEFAULT '0', "cardType" "public"."cards_cardtype_enum" NOT NULL DEFAULT 'debit', "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id")); COMMENT ON COLUMN "cards"."bankName" IS '银行名称'; COMMENT ON COLUMN "cards"."bankLogo" IS '银行Logo'; COMMENT ON COLUMN "cards"."lastFourDigits" IS '卡尾号'; COMMENT ON COLUMN "cards"."balance" IS '余额'; COMMENT ON COLUMN "cards"."cardType" IS '卡片类型'; COMMENT ON COLUMN "cards"."userId" IS '用户ID'; COMMENT ON COLUMN "cards"."createdAt" IS '创建时间'; COMMENT ON COLUMN "cards"."updatedAt" IS '更新时间'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TYPE "public"."cards_cardtype_enum"`);
    }

}
