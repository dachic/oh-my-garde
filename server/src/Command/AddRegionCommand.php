<?php

namespace App\Command;

use App\Entity\Region;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class AddRegionCommand extends Command
{
    protected static $defaultName = 'app:region:add';

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();
        $this->em = $em;
    }

    protected function configure()
    {
        $this
            ->setDescription('Register new region')
            ->addArgument('name', InputArgument::REQUIRED, 'new region name');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $name = $input->getArgument('name');

        $region = new Region();
        $region->setName($name);

        $this->em->persist($region);
        $this->em->flush();

        $io->success(sprintf('New region : %s ', $name));
        return 0;
        // bin/console app:region:add Auvergne-Rhône-Alpes
    }
}
