<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200401190121 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE disponibility_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE intership_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE hospital_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE region_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE user_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE guard_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE disponibility_hour_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE pharmacy_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE agrement_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE job_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE omg_disponibility (id INT NOT NULL, user_id INT DEFAULT NULL, hour_id INT DEFAULT NULL, day VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D3ECBBC8A76ED395 ON omg_disponibility (user_id)');
        $this->addSql('CREATE INDEX IDX_D3ECBBC8B5937BF9 ON omg_disponibility (hour_id)');
        $this->addSql('CREATE TABLE omg_intership (id INT NOT NULL, user_id INT DEFAULT NULL, pharmacy_id INT DEFAULT NULL, position VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8C231241A76ED395 ON omg_intership (user_id)');
        $this->addSql('CREATE INDEX IDX_8C2312418A94ABE2 ON omg_intership (pharmacy_id)');
        $this->addSql('CREATE TABLE omg_intership_agrement (intership_id INT NOT NULL, agrement_id INT NOT NULL, PRIMARY KEY(intership_id, agrement_id))');
        $this->addSql('CREATE INDEX IDX_459C1F199495B42F ON omg_intership_agrement (intership_id)');
        $this->addSql('CREATE INDEX IDX_459C1F1966BFF398 ON omg_intership_agrement (agrement_id)');
        $this->addSql('CREATE TABLE omg_hospital (id INT NOT NULL, region_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_32368B598260155 ON omg_hospital (region_id)');
        $this->addSql('CREATE TABLE omg_region (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE omg_user (id INT NOT NULL, pharmacy_id INT DEFAULT NULL, region_id INT NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, roles jsonb NOT NULL, phone_number VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_85ED2EF68A94ABE2 ON omg_user (pharmacy_id)');
        $this->addSql('CREATE INDEX IDX_85ED2EF698260155 ON omg_user (region_id)');
        $this->addSql('CREATE TABLE omg_guard (id INT NOT NULL, user_id INT DEFAULT NULL, pharmacy_id INT DEFAULT NULL, hour_id INT DEFAULT NULL, job_id INT DEFAULT NULL, day VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_F4C4C329A76ED395 ON omg_guard (user_id)');
        $this->addSql('CREATE INDEX IDX_F4C4C3298A94ABE2 ON omg_guard (pharmacy_id)');
        $this->addSql('CREATE INDEX IDX_F4C4C329B5937BF9 ON omg_guard (hour_id)');
        $this->addSql('CREATE INDEX IDX_F4C4C329BE04EA9 ON omg_guard (job_id)');
        $this->addSql('CREATE TABLE omg_guard_agrement (guard_id INT NOT NULL, agrement_id INT NOT NULL, PRIMARY KEY(guard_id, agrement_id))');
        $this->addSql('CREATE INDEX IDX_49E65D126CA29A61 ON omg_guard_agrement (guard_id)');
        $this->addSql('CREATE INDEX IDX_49E65D1266BFF398 ON omg_guard_agrement (agrement_id)');
        $this->addSql('CREATE TABLE omg_disponibility_hour (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE omg_pharmacy (id INT NOT NULL, hospital_id INT NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(255) DEFAULT NULL, phone_number VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9760FCF063DBB69 ON omg_pharmacy (hospital_id)');
        $this->addSql('CREATE TABLE omg_agrement (id INT NOT NULL, name VARCHAR(255) NOT NULL, code VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE omg_job (id INT NOT NULL, title VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE omg_disponibility ADD CONSTRAINT FK_D3ECBBC8A76ED395 FOREIGN KEY (user_id) REFERENCES omg_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_disponibility ADD CONSTRAINT FK_D3ECBBC8B5937BF9 FOREIGN KEY (hour_id) REFERENCES omg_disponibility_hour (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_intership ADD CONSTRAINT FK_8C231241A76ED395 FOREIGN KEY (user_id) REFERENCES omg_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_intership ADD CONSTRAINT FK_8C2312418A94ABE2 FOREIGN KEY (pharmacy_id) REFERENCES omg_pharmacy (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_intership_agrement ADD CONSTRAINT FK_459C1F199495B42F FOREIGN KEY (intership_id) REFERENCES omg_intership (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_intership_agrement ADD CONSTRAINT FK_459C1F1966BFF398 FOREIGN KEY (agrement_id) REFERENCES omg_agrement (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_hospital ADD CONSTRAINT FK_32368B598260155 FOREIGN KEY (region_id) REFERENCES omg_region (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_user ADD CONSTRAINT FK_85ED2EF68A94ABE2 FOREIGN KEY (pharmacy_id) REFERENCES omg_pharmacy (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_user ADD CONSTRAINT FK_85ED2EF698260155 FOREIGN KEY (region_id) REFERENCES omg_region (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_guard ADD CONSTRAINT FK_F4C4C329A76ED395 FOREIGN KEY (user_id) REFERENCES omg_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_guard ADD CONSTRAINT FK_F4C4C3298A94ABE2 FOREIGN KEY (pharmacy_id) REFERENCES omg_pharmacy (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_guard ADD CONSTRAINT FK_F4C4C329B5937BF9 FOREIGN KEY (hour_id) REFERENCES omg_disponibility_hour (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_guard ADD CONSTRAINT FK_F4C4C329BE04EA9 FOREIGN KEY (job_id) REFERENCES omg_job (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_guard_agrement ADD CONSTRAINT FK_49E65D126CA29A61 FOREIGN KEY (guard_id) REFERENCES omg_guard (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_guard_agrement ADD CONSTRAINT FK_49E65D1266BFF398 FOREIGN KEY (agrement_id) REFERENCES omg_agrement (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_pharmacy ADD CONSTRAINT FK_9760FCF063DBB69 FOREIGN KEY (hospital_id) REFERENCES omg_hospital (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE omg_intership_agrement DROP CONSTRAINT FK_459C1F199495B42F');
        $this->addSql('ALTER TABLE omg_pharmacy DROP CONSTRAINT FK_9760FCF063DBB69');
        $this->addSql('ALTER TABLE omg_hospital DROP CONSTRAINT FK_32368B598260155');
        $this->addSql('ALTER TABLE omg_user DROP CONSTRAINT FK_85ED2EF698260155');
        $this->addSql('ALTER TABLE omg_disponibility DROP CONSTRAINT FK_D3ECBBC8A76ED395');
        $this->addSql('ALTER TABLE omg_intership DROP CONSTRAINT FK_8C231241A76ED395');
        $this->addSql('ALTER TABLE omg_guard DROP CONSTRAINT FK_F4C4C329A76ED395');
        $this->addSql('ALTER TABLE omg_guard_agrement DROP CONSTRAINT FK_49E65D126CA29A61');
        $this->addSql('ALTER TABLE omg_disponibility DROP CONSTRAINT FK_D3ECBBC8B5937BF9');
        $this->addSql('ALTER TABLE omg_guard DROP CONSTRAINT FK_F4C4C329B5937BF9');
        $this->addSql('ALTER TABLE omg_intership DROP CONSTRAINT FK_8C2312418A94ABE2');
        $this->addSql('ALTER TABLE omg_user DROP CONSTRAINT FK_85ED2EF68A94ABE2');
        $this->addSql('ALTER TABLE omg_guard DROP CONSTRAINT FK_F4C4C3298A94ABE2');
        $this->addSql('ALTER TABLE omg_intership_agrement DROP CONSTRAINT FK_459C1F1966BFF398');
        $this->addSql('ALTER TABLE omg_guard_agrement DROP CONSTRAINT FK_49E65D1266BFF398');
        $this->addSql('ALTER TABLE omg_guard DROP CONSTRAINT FK_F4C4C329BE04EA9');
        $this->addSql('DROP SEQUENCE disponibility_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE intership_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE hospital_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE region_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE user_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE guard_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE disponibility_hour_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE pharmacy_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE agrement_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE job_id_seq CASCADE');
        $this->addSql('DROP TABLE omg_disponibility');
        $this->addSql('DROP TABLE omg_intership');
        $this->addSql('DROP TABLE omg_intership_agrement');
        $this->addSql('DROP TABLE omg_hospital');
        $this->addSql('DROP TABLE omg_region');
        $this->addSql('DROP TABLE omg_user');
        $this->addSql('DROP TABLE omg_guard');
        $this->addSql('DROP TABLE omg_guard_agrement');
        $this->addSql('DROP TABLE omg_disponibility_hour');
        $this->addSql('DROP TABLE omg_pharmacy');
        $this->addSql('DROP TABLE omg_agrement');
        $this->addSql('DROP TABLE omg_job');
    }
}
