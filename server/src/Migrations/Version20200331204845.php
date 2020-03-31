<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200331204845 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('DROP TABLE omg_pharmacy_agrement');
        $this->addSql('ALTER TABLE omg_user DROP address');
        $this->addSql('ALTER TABLE omg_pharmacy ALTER email DROP NOT NULL');
        $this->addSql('ALTER TABLE omg_pharmacy ALTER phone_number DROP NOT NULL');
        $this->addSql('ALTER TABLE omg_agrement ADD code VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE omg_pharmacy_agrement (pharmacy_id INT NOT NULL, agrement_id INT NOT NULL, PRIMARY KEY(pharmacy_id, agrement_id))');
        $this->addSql('CREATE INDEX idx_902b612866bff398 ON omg_pharmacy_agrement (agrement_id)');
        $this->addSql('CREATE INDEX idx_902b61288a94abe2 ON omg_pharmacy_agrement (pharmacy_id)');
        $this->addSql('ALTER TABLE omg_pharmacy_agrement ADD CONSTRAINT fk_902b61288a94abe2 FOREIGN KEY (pharmacy_id) REFERENCES omg_pharmacy (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_pharmacy_agrement ADD CONSTRAINT fk_902b612866bff398 FOREIGN KEY (agrement_id) REFERENCES omg_agrement (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE omg_pharmacy ALTER email SET NOT NULL');
        $this->addSql('ALTER TABLE omg_pharmacy ALTER phone_number SET NOT NULL');
        $this->addSql('ALTER TABLE omg_agrement DROP code');
        $this->addSql('ALTER TABLE omg_user ADD address VARCHAR(255) DEFAULT NULL');
    }
}
