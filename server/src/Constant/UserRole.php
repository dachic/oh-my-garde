<?php

namespace App\Constant;

class UserRole
{
    const ROLE_USER = 'ROLE_USER';
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_PHARMACY = 'ROLE_PHARMACY';
    const ROLE_INTERN = 'ROLE_INTERN';

    public static $choices = [
        self::ROLE_USER => 'Utilisateur',
        self::ROLE_ADMIN => 'Administrateur',
        self::ROLE_PHARMACY => "Chef de l'hôpital",
        self::ROLE_INTERN => 'Interne',
    ];

    public static function getRoles() {
        return self::$choices;
    }

    public static function getInvertedRoles() {
        return array_flip(self::getRoles());
    }
}
