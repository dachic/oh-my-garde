<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Guard;
use App\Entity\Pharmacy;
use App\Entity\DisponibilityHour;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use App\Repository\DisponibilityHourRepository;


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
        $repository_pharmacy = $this->getDoctrine()->getRepository(Pharmacy::class);

        $array = [];

        // on recupere tout les internes
        $ids = $repository_user->findByRole("ROLE_INTERN");

        // on recupere toutes les heures
        $hours = $repository_disponibility_hour->findHourGuard();

        // on recupere toutes les gardes
        $guards = $repository_guard->findBy(['status' => 'accepted']);

        // on recupere toutes les pharmacies
        $pharmacies = $repository_pharmacy->findAll();

        

        // on fait une boucle pour chaque interne
        foreach($ids as $id)
        {         
            foreach($hours as $hour)
            {
               
              foreach($pharmacies as $pharmacy)
                {
                    $count =  0; 
                    foreach($guards as $guard)
                    {
                        if(($guard->getHour()->getId() == $hour->getId()) && ($guard->getUser()->getId() == $id->getId()) && ($guard->getPharmacy()->getId() == $pharmacy->getId()))
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
     * @Route("/guard/all", name="user_all", methods={"GET","POST"})
     */
    public function all(): Response
    {
        $em = $this->getDoctrine()->getManager();

        $repository = $this->getDoctrine()->getRepository(Guard::class);

        $array = $repository->findBy(['status' => 'accepted'],['user' => 'ASC','pharmacy' => 'ASC', 'hour' => 'ASC']);
        $array2 = [];
        foreach($array as $object){
            array_push($array2, $object->toString());
        }
       
        $response = new Response();
        $response->setContent(json_encode(
            $array2
        ));
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }
    
}    