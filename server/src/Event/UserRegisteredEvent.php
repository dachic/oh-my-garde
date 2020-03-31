<?php

namespace App\Event;

use App\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

/**
 * The user.registered event is dispatched each time an user is created
 * in the system.
 */
class UserRegisteredEvent extends Event
{
    public const NAME = 'user.registered';

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function getUser()
    {
        return $this->user;
    }
}
