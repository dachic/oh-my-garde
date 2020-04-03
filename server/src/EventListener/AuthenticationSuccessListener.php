<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;


use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessListener
{
    /**
     * @param AuthenticationSuccessEvent $event
     *
     * @return void
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $payload = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $payload['id'] = $user->getId();
        $payload['username'] = $user->getEmail();
        $payload['firstname'] = $user->getFirstname();
        $payload['lastname'] = $user->getLastname();
        $payload['role'] = $user->getRoles()[0];
        $payload['roleAsString'] = $user->getRoleAsString();
        $payload['status'] = $user->getStatus();
        $payload['pharmacy'] = $user->getPharmacy()->getId();

        $event->setData($payload);
    }
}
