<?php

namespace App\Constant;

class UserStatus {

    const STATUS_ENABLED = 'enabled';
    const STATUS_DISABLED = 'disabled';

    public static $choices = [
        self::STATUS_ENABLED => 'Activé',
        self::STATUS_DISABLED => 'Désactivé',
    ];

    public static function getStatuses() {
        return self::$choices;
    }

    public static function getInvertedStatuses() {
        return array_flip(self::getStatuses());
    }
}
