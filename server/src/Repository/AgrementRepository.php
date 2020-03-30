<?php

namespace App\Repository;

use App\Entity\Agrement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Agrement|null find($id, $lockMode = null, $lockVersion = null)
 * @method Agrement|null findOneBy(array $criteria, array $orderBy = null)
 * @method Agrement[]    findAll()
 * @method Agrement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AgrementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Agrement::class);
    }

    // /**
    //  * @return Agrement[] Returns an array of Agrement objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Agrement
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
