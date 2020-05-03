<?php

namespace App\Command;

use App\Entity\DisponibilityHour;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class InsertAllDisponibilityHourInsertCommand extends Command
{
    protected static $defaultName = 'app:disponibility-hour:insert-all';

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();
        $this->em = $em;
    }

    protected function configure()
    {
        $this
            ->setDescription('Insert all disponibility hours');;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        // DisponibilityHour
        $hours = ['Jour', 'Nuit', 'Jour et Nuit'];

        foreach ($hours as $hour) {
            $disponibilityHour = new DisponibilityHour();
            $disponibilityHour->setName($hour);
            $this->em->persist($disponibilityHour);

            $io->note(sprintf('Disponibility Hour saved : (%d | %s)', $disponibilityHour->getId(), $disponibilityHour->getName()));
        }

        $this->em->flush();
        $io->success(sprintf('All Disponibility hour have been registered'));

        return 0;
    }
}
