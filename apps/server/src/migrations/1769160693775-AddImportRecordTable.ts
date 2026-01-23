import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImportRecordTable1769160693775 implements MigrationInterface {
    name = 'AddImportRecordTable1769160693775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."import_records_status_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`CREATE TABLE "import_records" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_name" character varying NOT NULL, "file_type" character varying NOT NULL, "status" "public"."import_records_status_enum" NOT NULL DEFAULT 'pending', "total_count" integer NOT NULL DEFAULT '0', "success_count" integer NOT NULL DEFAULT '0', "fail_count" integer NOT NULL DEFAULT '0', "error_message" text, "import_time" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_f4868b33006f0644c6ece6c9a69" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "import_records"`);
        await queryRunner.query(`DROP TYPE "public"."import_records_status_enum"`);
    }

}
