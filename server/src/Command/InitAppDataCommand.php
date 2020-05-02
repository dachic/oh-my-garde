<?php

namespace App\Command;

use Faker;
use App\Entity\User;
use App\Entity\Region;
use App\Entity\Agrement;
use App\Constant\UserRole;
use App\Entity\DisponibilityHour;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class InitAppDataCommand extends Command
{
    protected static $defaultName = 'app:init-app-data';

    private $passwordEncoder;

    private $em;

    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder,
        EntityManagerInterface $em
    ) {
        parent::__construct();
        $this->passwordEncoder = $passwordEncoder;
        $this->em = $em;
    }

    protected function configure()
    {
        $this
            ->setDescription('Bootstrap app with initial data')
            ->addOption('test', null, InputOption::VALUE_NONE, 'If set, the test user will be created');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $isTest = $input->getOption('test');

        $faker = Faker\Factory::create('fr_FR');

        $region = $this->em->getRepository(Region::class)->find(1);

        if ($isTest) {
            // User
            $userAdmin = new User();
            $userAdmin->setLastname($faker->lastName)
                ->setFirstname($faker->firstName)
                ->setPassword($this->passwordEncoder->encodePassword($userAdmin, 'admin'))
                ->setEmail('admin@ohmygarde.app')
                ->setPhoneNumber($faker->phoneNumber)
                ->setStatus('enabled')
                ->setRegion($region)
                ->setRoles([UserRole::ROLE_ADMIN]);
            $this->em->persist($userAdmin);

            // pharmacy user
            $userPharmacy = new User();
            $userPharmacy->setLastname($faker->lastName)
                ->setFirstname($faker->firstName)
                ->setPassword($this->passwordEncoder->encodePassword($userPharmacy, 'pharmacy'))
                ->setEmail('pharmacy@ohmygarde.app')
                ->setPhoneNumber($faker->phoneNumber)
                ->setStatus('enabled')
                ->setRegion($region)
                ->setRoles([UserRole::ROLE_PHARMACY]);
            $this->em->persist($userPharmacy);

            // interne user
            $userIntern = new User();
            $userIntern->setLastname($faker->lastName)
                ->setFirstname($faker->firstName)
                ->setPassword($this->passwordEncoder->encodePassword($userIntern, 'intern'))
                ->setEmail('intern@ohmygarde.app')
                ->setPhoneNumber($faker->phoneNumber)
                ->setStatus('enabled')
                ->setRegion($region)
                ->setRoles([UserRole::ROLE_INTERN]);
            $this->em->persist($userIntern);
        }

        // DisponibilityHour
        $hours = ['Jour', 'Nuit'];

        foreach ($hours as $hour) {
            $disponibilityHour = new DisponibilityHour();
            $disponibilityHour->setName($hour);
            $this->em->persist($disponibilityHour);
        }

        $agrements = [
            '108' => 'Pharmacie Clinique',
            '109' => 'Economie & Vigilance',
            '110' => 'Préparation et contrôles',
            '111' => 'Dispositifs médicaux stériles & stérilisation.'
        ];

        foreach ($agrements as $code => $name) {
            $agrement = new Agrement();
            $agrement->setCode($code);
            $agrement->setName($name);

            $this->em->persist($agrement);
        }

        $this->em->flush();
        $io->success('All bootstrap data added');

        return 0;
    }
}
