<?php

namespace App\Command;

use Faker;
use App\Entity\Job;
use App\Entity\User;
use App\Entity\Guard;
use App\Entity\Region;
use App\Entity\Agrement;
use App\Entity\Hospital;
use App\Entity\Pharmacy;
use App\Constant\UserRole;
use App\Constant\GuardStatus;
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

            $userInterns = [];

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
            array_push($userInterns, $userIntern);

            $userIntern = new User();
            $userIntern->setLastname($faker->lastName)
                ->setFirstname($faker->firstName)
                ->setPassword($this->passwordEncoder->encodePassword($userIntern, 'intern'))
                ->setEmail('internx@ohmygarde.app')
                ->setPhoneNumber($faker->phoneNumber)
                ->setStatus('enabled')
                ->setRegion($region)
                ->setRoles([UserRole::ROLE_INTERN]);
            $this->em->persist($userIntern);
            array_push($userInterns, $userIntern);

            $pharmacies = [];
            // Pharmacy
            $hospital = $this->em->getRepository(Hospital::class)->find(1);
            $pharmacy = new Pharmacy();
            $pharmacy->setName('Pharmacie 1');
            $pharmacy->setHospital($hospital);
            $pharmacy->setEmail('uuuuuuuu@gmail.com');
            $this->em->persist($pharmacy);
            array_push($pharmacies, $pharmacy);

            $hospital = $this->em->getRepository(Hospital::class)->find(2);
            $pharmacy = new Pharmacy();
            $pharmacy->setName('Pharmacie 2');
            $pharmacy->setHospital($hospital);
            $pharmacy->setEmail('uuuuuuuux@gmail.com');
            $this->em->persist($pharmacy);
            array_push($pharmacies, $pharmacy);

            $disponibilityHours = $this->em->getRepository(DisponibilityHour::class)->findAll();
            $jobs = $this->em->getRepository(Job::class)->findAll();

            // fake guards
            for ($i = 0; $i < 100; $i++) {
                $guard = new Guard();
                $guard->setUser($userInterns[array_rand($userInterns)])
                    ->setHour($disponibilityHours[array_rand($disponibilityHours)])
                    ->setDay('monday')
                    ->setJob($jobs[array_rand($jobs)])
                    ->setPharmacy($pharmacies[array_rand($pharmacies)])
                    ->setStatus(GuardStatus::STATUS_ACCEPTED);
                $this->em->persist($guard);
            }
        }

        $this->em->flush();
        $io->success('All bootstrap data added');

        return 0;
    }
}
