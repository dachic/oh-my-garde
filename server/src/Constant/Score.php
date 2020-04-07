<?php

namespace App\Constant;

class Score
{
    const WORKED_AT_HOSPITAL = 10;
    const WORKED_IN_A_SAME_POSITION = 3;
    const HAS_REQUIRED_APPROVALS = 5;
    const IS_CLOSE_TO_HOSPIAL = 1;
    const MAXIMUM_SCORE = self::WORKED_AT_HOSPITAL + self::WORKED_IN_A_SAME_POSITION + self::HAS_REQUIRED_APPROVALS + self::IS_CLOSE_TO_HOSPIAL;
}
