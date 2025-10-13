import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1760310303389 implements MigrationInterface {
    name = 'Default1760310303389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "type" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
    }

}
