import { MigrationInterface, QueryRunner } from "typeorm";

export class default1659205545363 implements MigrationInterface {
    name = 'default1659205545363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "description" SET NOT NULL`);
    }

}
