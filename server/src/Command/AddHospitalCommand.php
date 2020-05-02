<?php

namespace App\Command;

use App\Entity\Region;
use App\Entity\Hospital;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class AddHospitalCommand extends Command
{
    protected static $defaultName = 'app:hospital:add';

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();
        $this->em = $em;
    }

    protected function configure()
    {
        $this
            ->setDescription('Register new hospital')
            ->addArgument('name', InputArgument::REQUIRED, "hospital's name")
            ->addArgument('postalCode', InputArgument::REQUIRED, "hospital's postal Code")
            ->addArgument('regionId', InputArgument::REQUIRED, "hospital's region ID");
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $name = $input->getArgument('name');
        $postalCode = $input->getArgument('postalCode');
        $regionId = $input->getArgument('regionId');

        $region = $this->em->getRepository(Region::class)->find($regionId);

        if (!($region instanceof Region)) {
            $io->warning(sprintf('La region : %d n\'existe pas', $regionId));
            return -1;
        }

        $hospital = new Hospital();
        $hospital->setName($name);
        $hospital->setPostalCode($postalCode);
        $hospital->setRegion($region);

        $this->em->persist($hospital);
        $this->em->flush();
        $io->success(sprintf('Hospital saved : (%s | %d | %s)', $name, $postalCode, $region->getName()));

        return 0;
    }
}
