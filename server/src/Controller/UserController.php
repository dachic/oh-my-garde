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
    public function index(/*Request $request*/ ): Response
    {
        $em = $this->getDoctrine()->getManager();

        
        $repository_guard = $this->getDoctrine()->getRepository(Guard::class);
        
        //$page = $request->query->get('page',1);
        //$limit = $request->query->get('limit',10);
       
    $array = $repository_guard->findAllGroup(/*$page,$limit*/);
        
        $newArray = [];
       foreach($array as $k => $value){
           array_push($newArray,[
               'id'         => $k+1,
               'firstname' => $value['firstname'],
               'IdUtilisateur' => $value['IdUtilisateur'],
               'lastname'=> $value['lastname'],
               'namePharmacy'=> $value['name'],
               'horaire'=> $value['hour'],
               'phoneNumber'=> $value['phoneNumber'],
               'email'=> $value['email'],
               'emailPharmacy'=> $value['emailPharmacy'],
               'phoneNumberPharmacy'=> $value['phoneNumberPharmacy'],
               'nbGarde'=> $value['nbJour'],
               /*'limit'=> $limit ,
               'page'=> $page,*/

           ]);
           
       }

    
        $response = new Response();
        $response->setContent(json_encode(
            $newArray
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
        $newArray = [];
        foreach($array as $object){
            array_push($newArray, $object->toString());
        }
       
        $response = new Response();
        $response->setContent(json_encode(
            $newArray
        ));
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }
    
}    