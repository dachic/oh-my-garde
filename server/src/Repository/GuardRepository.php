<?php

namespace App\Repository;

use App\Constant\GuardStatus;
use App\Entity\Guard;
use App\Entity\User;
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

    /**
     * Get all number of hours of guards for specified user
     *
     * @param User $user
     * @return void
     */
    public function findAllPerPeriodByUser(User $user)
    {
        return $this->createQueryBuilder('g')
            ->select('u.id as userId')
            ->addSelect('count(h.id) as guardCount')
            ->addSelect('h.id as periodId')
            ->addSelect('h.name as periodName')
            ->addSelect('ho.id as hospitalId')
            ->addSelect('ho.name as hospitalName')
            ->join('g.hour', 'h')
            ->join('g.user', 'u')
            ->join('g.pharmacy', 'p')
            ->join('p.hospital', 'ho')
            ->where('u = :user')
            ->andWhere('g.status = :status')
            ->setParameter('status', GuardStatus::STATUS_ACCEPTED)
            ->setParameter('user', $user)
            ->groupBy('h.id, u.id, ho.id')
            ->getQuery()
            ->getResult();
    }

    public function findAllGroup(/*$page, $limit*/)
    {
        return $this->em->createQuery("
        select u.id as IdUtilisateur,u.firstname, u.lastname,u.phoneNumber, u.email, d.name as hour ,h.name as hospital, p.name,p.email as emailPharmacy,p.phoneNumber as phoneNumberPharmacy ,count(g.id) as nbJour
        from App\Entity\Guard g, App\Entity\Pharmacy p, App\Entity\User u, App\Entity\DisponibilityHour d,App\Entity\Hospital h
        Where g.pharmacy = p.id
        And   g.user = u.id
        And  g.hour = d.id
        And  p.hospital = h.id
        And g.status = 'accepted'
        group by u.id, p.id, d.id,h.id
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
    public function findPending()
    {
        return $this->em->createQuery("
            select u.id as IdUtilisateur,u.firstname, u.lastname,u.phoneNumber, u.email, d.name as hour , p.name,p.email as emailPharmacy,p.phoneNumber as phoneNumberPharmacy ,h.name as hospital
            from App\Entity\Guard g, App\Entity\Pharmacy p, App\Entity\User u, App\Entity\DisponibilityHour d,App\Entity\Hospital h
            Where g.pharmacy = p.id
            And   g.user = u.id
            And  g.hour = d.id
            And  p.hospital = h.id
            And g.status = 'pending'
            ")->getResult();
    }
}
