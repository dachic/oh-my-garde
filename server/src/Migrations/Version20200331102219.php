<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200331102219 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE omg_user ADD pharmacy_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE omg_user ADD CONSTRAINT FK_85ED2EF68A94ABE2 FOREIGN KEY (pharmacy_id) REFERENCES omg_pharmacy (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_85ED2EF68A94ABE2 ON omg_user (pharmacy_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE omg_user DROP CONSTRAINT FK_85ED2EF68A94ABE2');
        $this->addSql('DROP INDEX UNIQ_85ED2EF68A94ABE2');
        $this->addSql('ALTER TABLE omg_user DROP pharmacy_id');
    }
}
