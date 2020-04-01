<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200401090631 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE job_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE omg_guard_agrement (guard_id INT NOT NULL, agrement_id INT NOT NULL, PRIMARY KEY(guard_id, agrement_id))');
        $this->addSql('CREATE INDEX IDX_49E65D126CA29A61 ON omg_guard_agrement (guard_id)');
        $this->addSql('CREATE INDEX IDX_49E65D1266BFF398 ON omg_guard_agrement (agrement_id)');
        $this->addSql('CREATE TABLE omg_job (id INT NOT NULL, title VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE omg_guard_agrement ADD CONSTRAINT FK_49E65D126CA29A61 FOREIGN KEY (guard_id) REFERENCES omg_guard (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_guard_agrement ADD CONSTRAINT FK_49E65D1266BFF398 FOREIGN KEY (agrement_id) REFERENCES omg_agrement (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_guard ADD job_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE omg_guard ADD CONSTRAINT FK_F4C4C329BE04EA9 FOREIGN KEY (job_id) REFERENCES omg_job (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_F4C4C329BE04EA9 ON omg_guard (job_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE omg_guard DROP CONSTRAINT FK_F4C4C329BE04EA9');
        $this->addSql('DROP SEQUENCE job_id_seq CASCADE');
        $this->addSql('DROP TABLE omg_guard_agrement');
        $this->addSql('DROP TABLE omg_job');
        $this->addSql('DROP INDEX IDX_F4C4C329BE04EA9');
        $this->addSql('ALTER TABLE omg_guard DROP job_id');
    }
}
