<?php

namespace App\Repository;

use App\Entity\Pharmacy;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Pharmacy|null find($id, $lockMode = null, $lockVersion = null)
 * @method Pharmacy|null findOneBy(array $criteria, array $orderBy = null)
 * @method Pharmacy[]    findAll()
 * @method Pharmacy[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PharmacyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Pharmacy::class);
    }

    // /**
    //  * @return Pharmacy[] Returns an array of Pharmacy objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Pharmacy
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
