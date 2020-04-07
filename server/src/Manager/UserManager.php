<?php

namespace App\Manager;

use App\Api\Dto\ForgotPasswordRequest;
use App\Entity\User;
use App\Entity\Order;
use App\Entity\FoodMenu;
use App\Entity\Transaction;
use Symfony\Component\Mercure\Update;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mercure\Publisher;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use App\Api\Dto\OrderRequest;

class UserManager
{
    public function __construct(
        EntityManagerInterface $em
    ) {
        $this->em = $em;
    }

    public function generateForgotPasswordToken(ForgotPasswordRequest $forgotPasswordRequest)
    {
        return new JsonResponse(['status' => 'Kaba'], 200);
    }
}
