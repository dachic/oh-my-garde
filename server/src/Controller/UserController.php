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


/**
 * @Route("/test")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/", name="user_index", methods={"GET","POST"})
     */
    public function index(): Response
    {
        $em = $this->getDoctrine()->getManager();

       
        $repository_user = $this->getDoctrine()->getRepository(User::class);
        $repository_guard = $this->getDoctrine()->getRepository(DisponibilityHour::class);

        $array = [];
        // on recupere tout les internes
        $ids = $repository_user->findByRole("ROLE_INTERN");

        // on fait une boucle pour chaque interne
        foreach($ids as $id){
            
            
            // on récupère chaque horaire
            $hours = $em->createQuery(
                "select distinct d.id from App\Entity\DisponibilityHour d, App\Entity\Guard g, App\Entity\User u
                where g.hour = d.id
                and g.user = u.id
                and u.id = ".$id->getId()."
                and g.status = 'accepted'
            ")->getResult();

            foreach($hours as $hour){

                $days = $em->createQuery(
                "select u.firstname, u.lastname, d.name as horaire, p.name, count(d.name) as nbJours
                from App\Entity\DisponibilityHour d, App\Entity\Guard g, App\Entity\User u, App\Entity\Pharmacy p
                where g.hour = d.id
                and g.user = u.id
                and g.pharmacy = p.id
                and u.id = ".$id->getId()."
                and g.status = 'accepted'
                and d.id = ".$hour['id']."
                group by u.firstname, u.lastname, d.name, p.name
                ")->getResult();

                foreach($days as $day)
                    array_push($array, $day);
            }

        }
       
        $response = new Response();
        $response->setContent(json_encode(
            $array
        ));
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }
}    