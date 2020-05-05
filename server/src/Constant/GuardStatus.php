<?php

namespace App\Constant;

class GuardStatus {

    const STATUS_PENDING = 'pending';
    const STATUS_ACCEPTED = 'accepted';

    public static $choices = [
        self::STATUS_PENDING => 'En attente',
        self::STATUS_ACCEPTED => 'Accepté',
    ];

    public static function getStatuses() {
        return self::$choices;
    }

    public static function getInvertedStatuses() {
        return array_flip(self::getStatuses());
    }
}
