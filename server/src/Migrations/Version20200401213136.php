<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200401213136 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE omg_intership DROP CONSTRAINT fk_8c2312418a94abe2');
        $this->addSql('DROP INDEX idx_8c2312418a94abe2');
        $this->addSql('ALTER TABLE omg_intership ADD hospital_id INT NOT NULL');
        $this->addSql('ALTER TABLE omg_intership DROP pharmacy_id');
        $this->addSql('ALTER TABLE omg_intership ADD CONSTRAINT FK_8C23124163DBB69 FOREIGN KEY (hospital_id) REFERENCES omg_hospital (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8C23124163DBB69 ON omg_intership (hospital_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE omg_intership DROP CONSTRAINT FK_8C23124163DBB69');
        $this->addSql('DROP INDEX IDX_8C23124163DBB69');
        $this->addSql('ALTER TABLE omg_intership ADD pharmacy_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE omg_intership DROP hospital_id');
        $this->addSql('ALTER TABLE omg_intership ADD CONSTRAINT fk_8c2312418a94abe2 FOREIGN KEY (pharmacy_id) REFERENCES omg_pharmacy (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_8c2312418a94abe2 ON omg_intership (pharmacy_id)');
    }
}
