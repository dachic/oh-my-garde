<?php
// src/Controller/MatchingController.php
namespace App\Controller;

use App\Constants\Score;
use App\Repository\GuardRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

use App\Repository\UserRepository;

class MatchingController
{

    /**
     * @Route("/guard/matching/{id}", name="app_guard_matching", methods={"GET"}, defaults={"_format": "json"})
     */
    public function getInternRankingForPosition(GuardRepository $guardRepository,UserRepository $userRepository,$id)
    {
        $encoders = array(new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        $guard = $guardRepository->find($id);
        $interns = $userRepository->findAll();

        $ranking = $this->getScorePerIntern($guard,$interns);

        $data = $serializer->serialize($ranking,'json',[
            'circular_reference_handler' => function ($object) {
                return $object;
            }
        ]);

        return new Response($data, 200, ['Content-Type' => 'application/json']);
    }

    public function getScorePerIntern($guard,$interns){
        $ranking = [];
        foreach($interns as $intern){
            $score = $this->calculateScore($guard,$intern);
            array_push($ranking,["intern" => $intern,"score" => $score]);
        };
        return $ranking;
    }

    public function calculateScore($guard,$intern){
        $internScore = 0;
        $skills = $this->getSkills($intern);

        if($this->hasSkills($guard->getId(),$skills['hospitalWhereWorked'])){
            $internScore += Score::WORKED_AT_HOSPITAL;
        }

        if ($this->hasSkills($guard->getJob()->getTitle(),$skills['heldPosition'])){
            $internScore += Score::WORKED_IN_A_SAME_POSITION;
        }

        if($this->hasAllAgrements($guard->getAgrements(),$skills['approvals'])){
            $internScore += Score::HAS_REQUIRED_APPROVALS;
        }

        return $internScore;
    }

    public function hasSkills($request,$skills){
        return in_array($request,$skills);
    }

    public function hasAllAgrements($requests,$agrements){
        foreach($requests as $agrement){
            if(!(in_array($agrement->getName(),$agrements))){
                return false;
            }
        }
        return true;
    }

    public function getSkills($intern){
        $skills['hospitalWhereWorked'] = [];
        $skills['heldPosition'] = [];
        $skills['approvals'] = [];
        foreach ($intern->getInterships() as $intership){
            array_push($skills['hospitalWhereWorked'] ,$intership->getPharmacy()->getId());
            foreach ($intership->getAgrements() as $agrement){
                array_push($skills['approvals'] , $agrement->getName());
            }
        }

        foreach ($intern->getGuards() as $guard){
            array_push($skills['hospitalWhereWorked'],$guard->getPharmacy()->getId());
            array_push($skills['heldPosition'], $guard->getJob()->getTitle());
            foreach ($guard->getAgrements() as $agrement){
                array_push($skills['approvals'] , $agrement->getName());
            }

        }
        return $skills;
    }
}