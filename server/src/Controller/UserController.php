<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Guard;
use App\Entity\DisponibilityHour;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use App\Repository\DisponibilityHourRepository;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;


/**
 * @Route("/user")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/guard/count", name="user_index", methods={"GET","POST"})
     */
    public function index(): Response
    {
        $em = $this->getDoctrine()->getManager();

        $repository_user = $this->getDoctrine()->getRepository(User::class);
        $repository_disponibility_hour = $this->getDoctrine()->getRepository(DisponibilityHour::class);
        $repository_guard = $this->getDoctrine()->getRepository(Guard::class);

        $array = [];

        // on recupere tout les internes
        $ids = $repository_user->findByRole("ROLE_INTERN");

        // on recupere toutes les heures
        $hours = $repository_disponibility_hour->findHourGuard();

        // on recupere toutes les gardes
        $guards = $repository_guard->findBy(['status' => 'accepted']);

        // on fait une boucle pour chaque interne
        foreach($ids as $id)
        {         
            foreach($hours as $hour)
            {
                $count = 0;
                foreach($guards as $guard)
                {
                    if(($guard->getHour()->getId() == $hour->getId()) && ($guard->getUser()->getId() == $id->getId()))
                    {
                        $count++;
                        $day = [
                            'LastName'  => $guard->getUser()->getLastName(),
                            'FirstName' => $guard->getUser()->getFirstName(),
                            'Name'      => $guard->getPharmacy()->getName(),
                            'Horaire'   => $hour->getName(),
                            'NbGarde'   => $count
                        ];
                    }
                }
                if(isset($day))
                {
                    array_push($array, $day);
                    unset($day);
                } 
            }
        }

        // unset tout les tableaux
        unset($ids);
        unset($hours);
        unset($guards);
       
        $response = new Response();
        $response->setContent(json_encode(
            $array
        ));
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @param User $user
     * @Route("/{id}/internships", name="user_internships", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function internships(User $user): Response
    {
        $encoders = array(new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        $infos = [];
        $infosAgr = [];
        $array = [];
        $agr = [];

        $colors = ['primary','success', 'danger', 'warning', 'info'];
        foreach ($user->getInterships() as $intership){
            foreach($intership->getAgrements() as $agrement)
            {
                shuffle($colors);
                $agr = [
                    "code" => $agrement->getCode(),
                    "name" => $agrement->getName(),
                    "color" => $colors[0]
                ];
                 array_push($infosAgr ,$agr); 
            }
            $infos = [
                'id'  => $intership->getId(),
                'position'  => $intership->getPosition(),
                'hospital'  => $intership->getHospital()->getName(),
                'agrement'  => $infosAgr,
                'creation'  => $intership->getCreatedAt()
            ];
            array_push($array ,$infos); 
            $infosAgr = [];
        }
        
        return $this->json([
            "data" => $array
        ]);
    }
}    
