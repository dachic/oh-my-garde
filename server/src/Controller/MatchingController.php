<?php
// src/Controller/MatchingController.php
namespace App\Controller;

use App\Constant\Score;
use App\Entity\User;
use App\Repository\GuardRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

use App\Repository\UserRepository;

class MatchingController
{

    /**
     * @Route("/api/guard/matching/{id}", name="app_guard_matching", methods={"GET"}, defaults={"_format": "json"})
     */
    public function getInternRankingForPosition(GuardRepository $guardRepository, UserRepository $userRepository, $id)
    {
        $guard = $guardRepository->find($id);
        $interns = $userRepository->findByRole('ROLE_INTERN');
        $ranking = $this->getScorePerIntern($guard, $interns);

        if ($guard->getUser()) {
            $rankingWithAffected = [];
            foreach ($ranking as $i => $rank) {
                if ($rank['intern']->getId() == $guard->getUser()->getId()) {
                    $rank['score']['status'] = $guard->getStatus();
                }
                array_push($rankingWithAffected, $rank);
            }
            return new Response($this->castJson($rankingWithAffected), 200, ['Content-Type' => 'application/json']);
        }
        return new Response($this->castJson($ranking), 200, ['Content-Type' => 'application/json']);
    }

    public function sortByBestRanked($internsScore, $limit = 5)
    {
        $tempRanking = [];
        $rankedScore = [];
        foreach ($internsScore as $i => $internScore) {
            $tempRanking[$i] = $internScore['score']['total'];
        }

        arsort($tempRanking);

        foreach ($tempRanking as $key => $value) {
            if ($limit > 0) {
                array_push($rankedScore, $internsScore[$key]);
            } else break;
            $limit--;
        }

        return $rankedScore;
    }

    public function getScorePerIntern($guard, $interns)
    {
        $internsScore = [];

        foreach ($interns as $intern) {
            if ($this->isAvailable($intern, $guard)) {
                $score = $this->calculateScore($guard, $intern);
                array_push($internsScore, ["intern" => $intern, "score" => $score]);
            }
        }

        return $this->sortByBestRanked($internsScore);
    }

    public function isAvailable($intern, $guard)
    {
        if ($guard->getPharmacy()->getHospital()->getRegion() == $intern->getRegion()) {
            foreach ($intern->getDisponibilities() as $disponibility) {
                if (($disponibility->getHour() == $guard->getHour()) && ($disponibility->getDay() == $guard->getDay())) {
                    return true;
                }
            }
        }
        return false;
    }

    public function calculateScore($guard, $intern)
    {
        $score['total'] = 0;
        $score['attribute'] = [];

        $skills = $this->getSkills($intern);

        if ($this->hasSkills($guard->getPharmacy()->getId(), $skills['pharmacyWhereWorked'])) {
            $score['total'] += Score::WORKED_AT_HOSPITAL;
            array_push($score['attribute'], 'WORKED_AT_HOSPITAL');
        }

        if ($this->hasAllAgrements($guard->getAgrements(), $skills['approvals'])) {
            $score['total'] += Score::HAS_REQUIRED_APPROVALS;
            array_push($score['attribute'], 'HAS_REQUIRED_APPROVALS');
        }

        // TODO: see if keep this field
        if ($this->hasSkills($guard->getJob()->getTitle(), $skills['heldPosition'])) {
            $score['total'] += Score::WORKED_IN_A_SAME_POSITION;
            array_push($score['attribute'], 'WORKED_IN_A_SAME_POSITION');
        }

        $score['percent'] = round(($score['total'] * 100) / score::MAXIMUM_SCORE);
        return $score;
    }

    public function hasSkills($request, $skills)
    {
        return in_array($request, $skills);
    }

    public function hasAllAgrements($requests, $agrements)
    {
        foreach ($requests as $agrement) {
            if (!(in_array($agrement->getCode(), $agrements))) {
                return false;
            }
        }
        return true;
    }

    public function getSkills($intern)
    {
        $skills['pharmacyWhereWorked'] = [];
        $skills['heldPosition'] = [];
        $skills['approvals'] = [];

        foreach ($intern->getInterships() as $internship) {
            array_push($skills['pharmacyWhereWorked'], $internship->getHospital()->getPharmacy()->getId());
            foreach ($internship->getAgrements() as $agrement) {
                array_push($skills['approvals'], $agrement->getCode());
            }
            array_push($skills['heldPosition'], $internship->getPosition());
        }
        return $skills;
    }

    public function castJson($ranking)
    {
        $encoders = array(new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        $data = $serializer->normalize($ranking, null, [AbstractNormalizer::ATTRIBUTES => ['id', 'firstname', 'lastname', 'email', 'phoneNumber', 'address']]);

        return $serializer->serialize($data, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object;
            }
        ]);
    }
}
