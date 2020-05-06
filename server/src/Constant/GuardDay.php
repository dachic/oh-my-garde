<?php

namespace App\Constant;

class GuardDay {

    const DAY_MONDAY = 'monday';
    const DAY_TUESDAY = 'tuesday';
    const DAY_WEDNESDAY = 'wednesday';
    const DAY_THURSDAY = 'thursday';
    const DAY_FRIDAY = 'friday';
    const DAY_SATURDAY = 'saturday';
    const DAY_SUNDAY = 'sunday';

    public static $choices = [
        self::DAY_MONDAY => 'Lundi',
        self::DAY_TUESDAY => 'Mardi',
        self::DAY_WEDNESDAY => 'Mercredi',
        self::DAY_THURSDAY => 'Jeudi',
        self::DAY_FRIDAY => 'Vendredi',
        self::DAY_SATURDAY => 'Samedi',
        self::DAY_SUNDAY => 'Dimanche',
    ];

    public static function getDays() {
        return self::$choices;
    }

    public static function getInvertedStatuses() {
        return array_flip(self::getDays());
    }
}
