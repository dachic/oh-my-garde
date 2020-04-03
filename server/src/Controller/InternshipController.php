<?php

namespace App\Controller;

use App\Entity\Intership;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api")
 */
class InternshipController extends AbstractController
{
    /**
     * @param Intership $internship
     * @Route("/internship/{id}", name="edit_internship", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function getInterships(Intership $internship): Response
    {
        $infos = [];
        $infosAgr = [];
        $agr = [];

        foreach ($internship->getAgrements() as $agrement){
          $agr = [
              "id" => $agrement->getId(),
              "name" => $agrement->getName()
          ];
            array_push($infosAgr ,$agr); 
        }
        
        $infos = [
              'id'  => $internship->getId(),
              'position'  => $internship->getPosition(),
              'hospital'  => [
                "id" => $internship->getHospital()->getId(),
                "name" => $internship->getHospital()->getName()
              ],
              'agrement'  => $infosAgr
        ];

        return $this->json([
            "data" => $infos
        ]);
    }
}
