import { MigrationInterface, QueryRunner } from "typeorm";

export class Tags1773211983687 implements MigrationInterface {
    name = 'Tags1773211983687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id")); COMMENT ON COLUMN "tags"."name" IS '标签名称'; COMMENT ON COLUMN "tags"."userId" IS '用户id'; COMMENT ON COLUMN "tags"."createdAt" IS '创建时间'; COMMENT ON COLUMN "tags"."updatedAt" IS '更新时间'`);
        await queryRunner.query(`CREATE TABLE "transaction_tags" ("transactionId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_172ada2fd5d5d973411a5157348" PRIMARY KEY ("transactionId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23ed9c8ca2e4b5cf639c580e50" ON "transaction_tags" ("transactionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ccbbef396290acaece98cb129b" ON "transaction_tags" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "transaction_tags" ADD CONSTRAINT "FK_23ed9c8ca2e4b5cf639c580e50b" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "transaction_tags" ADD CONSTRAINT "FK_ccbbef396290acaece98cb129b6" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_tags" DROP CONSTRAINT "FK_ccbbef396290acaece98cb129b6"`);
        await queryRunner.query(`ALTER TABLE "transaction_tags" DROP CONSTRAINT "FK_23ed9c8ca2e4b5cf639c580e50b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ccbbef396290acaece98cb129b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23ed9c8ca2e4b5cf639c580e50"`);
        await queryRunner.query(`DROP TABLE "transaction_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
