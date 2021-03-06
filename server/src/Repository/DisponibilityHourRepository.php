<?php

namespace App\Repository;

use App\Entity\DisponibilityHour;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Query\Expr\Join;

/**
 * @method DisponibilityHour|null find($id, $lockMode = null, $lockVersion = null)
 * @method DisponibilityHour|null findOneBy(array $criteria, array $orderBy = null)
 * @method DisponibilityHour[]    findAll()
 * @method DisponibilityHour[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DisponibilityHourRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DisponibilityHour::class);
    }

    // /**
    //  * @return DisponibilityHour[] Returns an array of DisponibilityHour objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DisponibilityHour
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    public function findHourGuard()
    {
        return $this->createQueryBuilder('d')
            ->innerJoin('App\Entity\Guard', 'g', Join::WITH, 'g.hour = d')
            ->andWhere('g.status = :status')
            ->setParameter('status', 'accepted')
            ->getQuery()
            ->getResult();
    }
}
