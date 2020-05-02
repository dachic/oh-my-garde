<?php

namespace App\Command;

use App\Entity\Region;
use App\Entity\Hospital;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class InsertAllHospitalCommand extends Command
{
    protected static $defaultName = 'app:hospital:insert-all';

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();
        $this->em = $em;
    }

    protected function configure()
    {
        $this
            ->setDescription('Insert all initial hospital data');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $region = $this->em->getRepository(Region::class)->find(1);

        foreach ($this->getHospitals() as $hospital) {
            [$name, $postalCode] = $hospital;
            $hospital = new Hospital();
            $hospital->setName($name);
            $hospital->setPostalCode($postalCode);
            $hospital->setRegion($region);

            $this->em->persist($hospital);
            $this->em->flush();
            $io->note(sprintf('Hospital saved : (%s | %d | %s)', $name, $postalCode, $region->getName()));
        }

        $io->success(sprintf('All hospitals have been registered'));

        return 0;
    }

    private function getHospitals()
    {
        return [
            ['Saint Chamond CH pays de Gier', '42152'],
            ['Valence', '26000'],
            ['Villefranche', '69400'],
            ['HCL Siege', '69002'],
            ['HCL HEH', '69008'],
            ['HCL GHN', '69004'],
            ['Charpennes (HCL)', '69100'],
            ['Grenoble', '38000'],
            ['Aurillac', '15000'],
            ['Clermont', '63000'],
            ['HCL GHE', '69677'],
            ['ANSM Lyon', '69007'],
            ['Fac Grenoble', '38700'],
            ['St Etienne', '42000'],
            ['Fac Lyon', '69008'],
            ['EFS Grenoble', '38700'],
            ['ARS Rhone-Alpes', '69003'],
            ['ARS Auvergne', '69003'],
            ['CTI', '69330'],
            ['Lyon', '69000'],
            ['Aubenas Ardeche Merid', '7200'],
            ['Bourg en Bresse', '1000'],
            ['Vienne', '38200'],
            ['Albigny CH Mont d\'Or', '69250'],
            ['Bourgoin', '38300'],
            ['Vinatier', '69677'],
            ['Antoine Charial (HCL)', '69340'],
            ['Pierre Garraud (HCL)', '69005'],
            ['St Joseph St Luc', '69007'],
            ['HCL CHLS', '69600'],
            ['Henry Gabrielle (HCL)', '69230'],
            ['Tarare', '69170'],
            ['Jean Perrin', '63011'],
            ['Sainte Marie', '63000'],
            ['Montlucon', '03100'],
            ['Annonay', '07100'],
            ['Mutualiste', '42100'],
            ['ICL', '42270'],
            ['CLB', '69008'],
            ['HCL PC', '69230'],
            ['Chambery', '73000'],
            ['Montelimar', '26200'],
            ['Grenoble (Hop Sud)', '38130'],
            ['Voiron', '38500'],
            ['Vichy', '03200'],
            ['Le Puy en Velay', '43000'],
            ['St Egreve CH Alpes Isere', '38120'],
            ['Annecy', '74000'],
            ['CBE', '69500'],
            ['CBN', '69004'],
            ['CBS', '69310'],
            ['HEH', '69003'],
            ['EFS Gerland', '69002'],
            ['St Luc St Jo', '69007'],
            ['HCL GHS', '69600'],
            ['Fac Clermont', '63001'],
            ['Cermep', '69500'],
            ['Fac Lyon Sud', '69600'],
            ['Grenoble', '38000'],
            ['Fac Grenoble', '38000'],
            ['Fac Clermont', '63001'],
            ['Thiers', '63430'],
            ['Roanne', '42300'],
            ['Givors', '69700'],
            ['Aix les Bains CH Metropole Savoie', '73000'],
            ['Oyonnax CH Haut Bugey', '01100'],
            ['Issoire', '63500'],
            ['UniversitÃƒÂ© Lyon', '69008'],
            ['Eugene Andre Clin Mut', '69003'],
            ['Villefranche s/ Saone', '69400'],
            ['EFS Greffe de moelle/HLA', '69002'],
            ['Alpes Leman (Contamine sur Arve)', '74130'],
            ['CRNL', '69500'],
            ['Drome Ardeche HP', '07500'],
            ['Firminy', '42700'],
            ['HCL CBPE', '69500'],
            ['Alpes Leman', '74130'],
            ['Moulins-Yzeure', '03006'],
            ['Forez - Montbrison', '42600'],
            ['Brioude', '43100'],
            ['Moulins', '03006'],
            ['Saint Jean de Maurienne', '73248'],
            ['CH Bassens', '73000'],
            ['Montelimar CH Portes de Provence', '26200'],
            ['Thonon Hopitaux du Leman', '74200'],
            ['Riom', '63200'],
            ['Cell Therapy Research Institute (CTI Biotech)', '69330'],
        ];
    }
}
