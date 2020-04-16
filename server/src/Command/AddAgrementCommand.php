<?php

namespace App\Command;

use App\Entity\Agrement;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class AddAgrementCommand extends Command
{
    protected static $defaultName = 'app:agrement:add';

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();
        $this->em = $em;
    }


    protected function configure()
    {
        $this
            ->setDescription('Register single agrement into database')
            ->addArgument('code', InputArgument::REQUIRED, 'Agrement code')
            ->addArgument('name', InputArgument::REQUIRED, 'Agrement name');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $code = $input->getArgument('code');
        $name = $input->getArgument('name');

        $agrement = new Agrement();
        $agrement->setCode($code);
        $agrement->setName($name);

        $this->em->persist($agrement);
        $this->em->flush();

        $io->success(sprintf('Agrement with code|name : (%s | %s) saved', $code, $name));

        return 0;
    }
}
