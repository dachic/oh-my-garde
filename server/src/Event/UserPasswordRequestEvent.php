<?php

namespace App\Event;

use App\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

/**
 * The user.password.requested event is dispatched each time an user request reset password link
 * in the system.
 */
class UserPasswordRequestEvent extends Event
{
    public const NAME = 'user.password.requested';

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
