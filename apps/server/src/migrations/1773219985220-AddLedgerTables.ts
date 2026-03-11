import type { MigrationInterface, QueryRunner } from 'typeorm'

export class AddLedgerTables1773219985220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "ledgers" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" text,
        "userId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_ledgers_id" PRIMARY KEY ("id")
      )
    `)

    await queryRunner.query(`
      CREATE TABLE "ledger_transactions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "ledgerId" uuid NOT NULL,
        "transactionId" uuid NOT NULL,
        CONSTRAINT "PK_ledger_transactions_id" PRIMARY KEY ("id")
      )
    `)

    // Create indexes for faster lookups (since we are not using foreign keys)
    await queryRunner.query('CREATE INDEX "IDX_ledgers_userId" ON "ledgers" ("userId")')
    await queryRunner.query('CREATE INDEX "IDX_ledger_transactions_ledgerId" ON "ledger_transactions" ("ledgerId")')
    await queryRunner.query('CREATE INDEX "IDX_ledger_transactions_transactionId" ON "ledger_transactions" ("transactionId")')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "IDX_ledger_transactions_transactionId"')
    await queryRunner.query('DROP INDEX "IDX_ledger_transactions_ledgerId"')
    await queryRunner.query('DROP INDEX "IDX_ledgers_userId"')
    await queryRunner.query('DROP TABLE "ledger_transactions"')
    await queryRunner.query('DROP TABLE "ledgers"')
  }
}
