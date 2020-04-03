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
 * @Route("/api/user")
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

        return $this->json($newArray);

    }
   /**
     * @param User $user
     * @Route("/{id}/internships", name="user_internships", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function internships(User $user): Response
    {
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
    /**
     * @param User $user
     * @Route("/{id}/pharmacy", name="user_pharmacy", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function pharmacy(User $user): Response
    {
        $infos = [];
        if($user->getPharmacy() != null)
        {
            $infos = [
                'pharmacyId'  => $user->getPharmacy()->getId(),
            ];
        }
        else
        {
            $infos = [
                'pharmacyId'  => '',
            ];
        }
        return $this->json([
            "data" => $infos
        ]);
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
