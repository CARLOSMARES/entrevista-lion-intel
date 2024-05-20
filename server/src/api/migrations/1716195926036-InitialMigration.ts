import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1716195926036 implements MigrationInterface {
    name = 'InitialMigration1716195926036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservacion" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nameUsuario" varchar NOT NULL, "fecha" datetime NOT NULL, "hora" datetime NOT NULL, "numeroSala" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "sala" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "numeroSala" integer NOT NULL, "pantalla" varchar NOT NULL, "telefono" varchar NOT NULL, "wifi" varchar NOT NULL, "numeroAsientos" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "rol" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "sala"`);
        await queryRunner.query(`DROP TABLE "reservacion"`);
    }

}
