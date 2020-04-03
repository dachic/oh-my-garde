<?php

namespace App\Repository;

use App\Entity\Guard;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method Guard|null find($id, $lockMode = null, $lockVersion = null)
 * @method Guard|null findOneBy(array $criteria, array $orderBy = null)
 * @method Guard[]    findAll()
 * @method Guard[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GuardRepository extends ServiceEntityRepository
{
    private $em;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager)
    {
        parent::__construct($registry, Guard::class);
        $this->em = $manager;
    }

    // /**
    //  * @return Guard[] Returns an array of Guard objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Guard
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    public function findAllGroup(/*$page, $limit*/)
    {   
        return $this->em->createQuery("
        select u.id as IdUtilisateur,u.firstname, u.lastname,u.phoneNumber, u.email, d.name as hour , p.name,p.email as emailPharmacy,p.phoneNumber as phoneNumberPharmacy ,count(g.id) as nbJour
        from App\Entity\Guard g, App\Entity\Pharmacy p, App\Entity\User u, App\Entity\DisponibilityHour d
        Where g.pharmacy = p.id
        And   g.user = u.id 
        And  g.hour = d.id
        And g.status = 'accepted'
        group by u.id, p.id, d.id
        ")->getResult();

        /*return $this->em->createQuery("
        select u.id as IdUtilisateur,u.firstname, u.lastname,u.phoneNumber, u.email, d.name as hour , p.name,p.email as emailPharmacy,p.phoneNumber as phoneNumberPharmacy ,count(g.id) as nbJour
        from App\Entity\Guard g, App\Entity\Pharmacy p, App\Entity\User u, App\Entity\DisponibilityHour d
        Where g.pharmacy = p.id
        And   g.user = u.id 
        And  g.hour = d.id
        And g.status = 'accepted'
        group by u.id, p.id, d.id
        ")->setFirstResult(($page - 1) * $limit)
          ->setMaxResults($limit)
          ->getResult();*/
    }

}
