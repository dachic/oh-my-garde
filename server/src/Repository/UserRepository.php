<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Region;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

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

    /**
     * Get all users' emails by user role
     *
     * @param string $role
     * @return array|null
     */
    public function findByRoleAsEmailKey(string $role): ?array
    {
        return $this->createQueryBuilder('u', 'u.email')
            ->where("JSONB_EXISTS(u.roles, :role) = TRUE")
            ->setParameter('role', $role)
            ->getQuery()
            ->getResult();
    }

    /**
     * Get all users' emails by user role and region
     *
     * @param string $role
     * @param Region $region
     * @return array|null
     */
    public function findByRoleAndRegionAsEmailKey(string $role, Region $region): ?array
    {
        return $this->createQueryBuilder('u', 'u.email')
            ->where("JSONB_EXISTS(u.roles, :role) = TRUE")
            ->setParameter('role', $role)
            ->innerJoin('u.region', 'rg', 'WITH', 'u.region IN (:region)')
            ->setParameter('region', $region)
            ->getQuery()
            ->getResult();
    }

    /**
     * Build find user by role query
     *
     * @param string $role
     * @return void
     */
    public function findByRoleQuery(string $role)
    {
        return $this->createQueryBuilder('u', 'u.email')
            ->where("JSONB_EXISTS(u.roles, :role) = TRUE")
            ->setParameter('role', $role)
            ->getQuery();
    }

    /**
     * Find all user corresponding to a specified role
     *
     * @param string $role
     * @return void
     */
    public function findByRole(string $role)
    {
        return $this->findByRoleQuery($role)
            ->getResult();
    }

    /**
     * Find only one user corresponding to a specified role
     *
     * @param string $role
     * @return
     */
    public function findOneByRole(string $role)
    {
        return $this->findByRoleQuery($role)
            ->getOneOrNullResult();
    }
}
