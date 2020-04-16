<?php

namespace App\Command;

use App\Entity\Job;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class AddJobCommand extends Command
{
    protected static $defaultName = 'app:job:insert';

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();
        $this->em = $em;
    }

    protected function configure()
    {
        $this
            ->setDescription('Register single job name into database')
            ->addArgument('jobTitle', InputArgument::REQUIRED, 'job name to save');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $jobTitle = $input->getArgument('jobTitle');

        if ($jobTitle) {

            $job = new Job();
            $job->setTitle($jobTitle);

            $this->em->persist($job);
            $this->em->flush();

            $io->success(sprintf('Job: %s saved', $jobTitle));
        }

        return 0;
    }
}
