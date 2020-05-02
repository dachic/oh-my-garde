<?php

namespace App\Constant;

class Score
{
    const WORKED_AT_HOSPITAL = 15;
    const HAS_REQUIRED_APPROVALS = 10;
    // const IS_CLOSE_TO_HOSPIAL = 1;
    const MAXIMUM_SCORE = self::WORKED_AT_HOSPITAL + self::HAS_REQUIRED_APPROVALS;
}
