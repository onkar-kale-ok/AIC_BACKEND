import { MigrationInterface, QueryRunner } from "typeorm";

export class Page1713014696087 implements MigrationInterface {
    name = 'Page1713014696087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "page" ("page_id" SERIAL NOT NULL, "page_name" character varying NOT NULL, "page_type" character varying, "page_edition" character varying NOT NULL, "page_owner" character varying NOT NULL, "page_url" character varying, "page_seo" character varying, "page_status" character varying, "page_comment" character varying, "created_by" character varying, "updated_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ffdbca57153b281b3e05249f560" PRIMARY KEY ("page_id"))`);

        await queryRunner.query(`INSERT INTO "page" ("page_name", "page_type", "page_edition", "page_owner", "page_url", "page_seo", "page_status", "page_comment", "created_by", "updated_by")
        VALUES ('All Product', 'Page List', 'First Edition', 'Admin', '', 'Some SEO Information', 'Active', 'Some comment about the page', 'Onkar kale', 'Updater Name')`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "page"`);
    }

}
