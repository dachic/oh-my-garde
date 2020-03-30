<?php

namespace App\Repository;

use App\Entity\Intership;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Intership|null find($id, $lockMode = null, $lockVersion = null)
 * @method Intership|null findOneBy(array $criteria, array $orderBy = null)
 * @method Intership[]    findAll()
 * @method Intership[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IntershipRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Intership::class);
    }

    // /**
    //  * @return Intership[] Returns an array of Intership objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Intership
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
