<?php
namespace App\DataFixtures;
use App\Entity\Disponibility;
use App\Entity\DisponibilityHour;
use App\Entity\Pharmacy;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;
use Faker;

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

        // User
        $userAdmin = new User();
        $userAdmin->setLastname($faker->lastName);
        $userAdmin->setFirstname($faker->firstName);
        $userAdmin->setPassword($this->passwordEncoder->encodePassword($userAdmin, 'admin'));
        $userAdmin->setEmail('admin@ohmygarde.app');
        $userAdmin->setPhoneNumber($faker->phoneNumber);
        $userAdmin->setStatus('fixture');
        $userAdmin->setRoles(['ROLE_ADMIN']);

        $manager->persist($userAdmin);

        $userPharmacy = new User();
        $userPharmacy->setLastname($faker->lastName);
        $userPharmacy->setFirstname($faker->firstName);
        $userPharmacy->setPassword($this->passwordEncoder->encodePassword($userPharmacy, 'pharmacy'));
        $userPharmacy->setEmail('pharmacy@ohmygarde.app');
        $userPharmacy->setPhoneNumber($faker->phoneNumber);
        $userPharmacy->setStatus('fixture');
        $userPharmacy->setRoles(['ROLE_PHARMACY']);

        $manager->persist($userPharmacy);

        $userIntern = new User();
        $userIntern->setLastname($faker->lastName);
        $userIntern->setFirstname($faker->firstName);
        $userIntern->setPassword($this->passwordEncoder->encodePassword($userIntern, 'intern'));
        $userIntern->setEmail('intern@ohmygarde.app');
        $userIntern->setPhoneNumber($faker->phoneNumber);
        $userIntern->setStatus('fixture');
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

        // Pharmacy
        $pharmacy = new Pharmacy();
        $pharmacy->setEmail('hospital@ohmygarde.app');
        $pharmacy->setPhoneNumber($faker->phoneNumber);
        $pharmacy->setName('Pharmacie des internes');
        $pharmacy->setHospitalName('CHU Lyon');

        $manager->flush();
    }
}