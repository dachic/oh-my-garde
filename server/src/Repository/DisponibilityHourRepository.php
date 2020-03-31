<?php

namespace App\Repository;

use App\Entity\DisponibilityHour;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

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
    public function findHourGuard($user_id)
    {
        return $this->createQuery(
            'select d.id from omg_disponibility_hour d, omg_guard g 
            where g.hour_id = d.id
            and g.user_id = '.$user_id.'
            and g.status = "accepted"
        ')
            ->getResult();
    }
}
