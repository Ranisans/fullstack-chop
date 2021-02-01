import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserRoleTable1612184689315 implements MigrationInterface {
  name = "addUserRoleTable1612184689315";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" text NOT NULL, "login" text NOT NULL, "hashedPassword" text NOT NULL, "roleIdId" integer, CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" text NOT NULL, "login" text NOT NULL, "hashedPassword" text NOT NULL, "roleIdId" integer, CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "FK_88caf607c870c4a5f0cbbc16c86" FOREIGN KEY ("roleIdId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "createdAt", "updatedAt", "name", "login", "hashedPassword", "roleIdId") SELECT "id", "createdAt", "updatedAt", "name", "login", "hashedPassword", "roleIdId" FROM "user"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" text NOT NULL, "login" text NOT NULL, "hashedPassword" text NOT NULL, "roleIdId" integer, CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"))`
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "createdAt", "updatedAt", "name", "login", "hashedPassword", "roleIdId") SELECT "id", "createdAt", "updatedAt", "name", "login", "hashedPassword", "roleIdId" FROM "temporary_user"`
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
