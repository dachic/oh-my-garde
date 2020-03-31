<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findByRoleAsEmailKey($role): ?array
    {
        return $this->createQueryBuilder('u', 'u.email')
            ->where('JSON_CONTAINS(u.roles, :role) = 1')// adapt to postgresql
            ->setParameter('role', '"' . $role . '"')
            ->getQuery()
            ->getResult();
    }
}
