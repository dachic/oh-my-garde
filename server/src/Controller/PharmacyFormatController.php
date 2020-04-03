<?php

namespace App\Controller;

use App\Entity\Pharmacy;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api")
 */
class PharmacyFormatController extends AbstractController
{
    /**
     * @param Pharmacy $pharmacy
     * @Route("/pharmacy/{id}", name="edit_pharmacy", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function getInterships(Pharmacy $pharmacy): Response
    {
        $infos = [];
        $infosAgr = [];

        $infos = [
          'id'  => $pharmacy->getId(),
          'name'  => $pharmacy->getName(),
          'email'  => $pharmacy->getEmail(),
          'phone'  => $pharmacy->getPhoneNumber(),
          'hospital'  => [
            "id" => $pharmacy->getHospital()->getId(),
            "name" => $pharmacy->getHospital()->getName()
          ],
        ];

        return $this->json([
            "data" => $infos
        ]);
    }
}
