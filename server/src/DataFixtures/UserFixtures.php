<?php

namespace App\DataFixtures;

use Faker;
use App\Entity\Job;
use App\Entity\User;
use App\Entity\Guard;
use App\Entity\Region;
use App\Entity\Agrement;
use App\Entity\Hospital;
use App\Entity\Pharmacy;
use App\Entity\Intership;
use App\Entity\Disponibility;
use App\Entity\DisponibilityHour;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $passwordEncoder;
    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');

        // Hospital & Region
        $regions = [];
        $hospitals = [];
        for ($i = 0; $i < 5; $i++) {
            $region = new Region();
            $region->setName('Region' . $i);
            $manager->persist($region);
            array_push($regions, $region);

            for ($j = 0; $j < 5; $j++) {
                $hospital = new Hospital();
                $hospital->setName('Hospital' . $i . "-" . $j);
                $hospital->setRegion($region);
                $manager->persist($hospital);
                array_push($hospitals, $hospital);
            }
        }

        // User
        $userAdmin = new User();
        $userAdmin->setLastname($faker->lastName);
        $userAdmin->setFirstname($faker->firstName);
        $userAdmin->setPassword($this->passwordEncoder->encodePassword($userAdmin, 'admin'));
        $userAdmin->setEmail('admin@ohmygarde.app');
        $userAdmin->setPhoneNumber($faker->phoneNumber);
        $userAdmin->setStatus('enabled');
        $userAdmin->setRegion($regions[1]);
        $userAdmin->setRoles(['ROLE_ADMIN']);
        $manager->persist($userAdmin);

        for ($i = 0; $i < 50; $i++) {
            // User
            $userFixture = new User();
            $userFixture->setLastname($faker->lastName);
            $userFixture->setFirstname($faker->firstName);
            $userFixture->setPassword($this->passwordEncoder->encodePassword($userFixture, 'admin'));
            $userFixture->setEmail('admin' . $i . '@ohmygarde.app');
            $userFixture->setPhoneNumber($faker->phoneNumber);
            $userFixture->setStatus('enabled');
            $userFixture->setRegion($regions[1]);
            $userFixture->setRoles(['ROLE_ADMIN']);
            $manager->persist($userFixture);
        }

        $userPharmacy = new User();
        $userPharmacy->setLastname($faker->lastName);
        $userPharmacy->setFirstname($faker->firstName);
        $userPharmacy->setPassword($this->passwordEncoder->encodePassword($userPharmacy, 'pharmacy'));
        $userPharmacy->setEmail('pharmacy@ohmygarde.app');
        $userPharmacy->setPhoneNumber($faker->phoneNumber);
        $userPharmacy->setStatus('enabled');
        $userPharmacy->setRegion($regions[2]);
        $userPharmacy->setRoles(['ROLE_PHARMACY']);

        $manager->persist($userPharmacy);

        $userIntern = new User();
        $userIntern->setLastname($faker->lastName);
        $userIntern->setFirstname($faker->firstName);
        $userIntern->setPassword($this->passwordEncoder->encodePassword($userIntern, 'intern'));
        $userIntern->setEmail('intern@ohmygarde.app');
        $userIntern->setPhoneNumber($faker->phoneNumber);
        $userIntern->setStatus('enabled');
        $userIntern->setRegion($regions[3]);
        $userIntern->setRoles(['ROLE_INTERN']);

        $manager->persist($userIntern);

        // DisponibilityHour
        $hours = ["8h-20h", "20h-23h", "6h-8h"];

        for ($i = 0; $i < sizeof($hours); $i++) {
            $disponibilityHour = new DisponibilityHour();
            $disponibilityHour->setName($hours[$i]);
            $manager->persist($disponibilityHour);
        }

        // Disponibility
        $days = ["monday", "thuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

        for ($i = 0; $i < sizeof($days); $i++) {
            $disponibility = new Disponibility();
            $disponibility->setUser($userIntern);
            $disponibility->setHour($disponibilityHour);
            $disponibility->setDay($days[$i]);
            $manager->persist($disponibility);
        }

        // Agrement
        $agrements = [
            "108" => "Pharmacie clinique",
            "109" => "Economie & Vigilance",
            "110" => "Préparation et contrôles",
            "111" => "Dispositifs médicaux stériles & stérilisation"
        ];

        foreach ($agrements as $code => $name) {
            $agrement = new Agrement();
            $agrement->setCode($code);
            $agrement->setName($name);
            $manager->persist($agrement);
        }

        // Pharmacy
        $pharmacy = new Pharmacy();
        $pharmacy->setEmail('hospital@ohmygarde.app');
        $pharmacy->setPhoneNumber($faker->phoneNumber);
        $pharmacy->setName('Pharmacie des internes');
        $pharmacy->setHospital($hospitals[3]);
        $manager->persist($pharmacy);

        // Job
        $job = new Job();
        $job->setTitle("CRPV");
        $manager->persist($job);

        // Guard
        $guard = new Guard();
        $guard->setDay('monday');
        $guard->setHour($disponibilityHour);
        $guard->setUser($userIntern);
        $guard->setStatus('accepted');
        $guard->addAgrement($agrement);
        $guard->setPharmacy($pharmacy);
        $guard->setJob($job);
        $manager->persist($guard);

        // Internship
        $internship = new Intership();
        $internship->setHospital($hospitals[3]);
        $internship->setUser($userIntern);
        $internship->addAgrement($agrement);
        $internship->setPosition("Intitulé du poste au sein de l'hôpital");
        $manager->persist($internship);

        $manager->flush();
    }
}
