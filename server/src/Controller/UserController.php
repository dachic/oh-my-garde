<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;


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

        $repository = $this->getDoctrine()->getRepository(User::class);

        $role = $repository->findByRole("ROLE_INTERN");
        

        $response = new Response();
       /* $response->setContent(json_encode([
            $statusA
        ]));
        $response->headers->set('Content-Type', 'application/json');*/
        return $response;

    }
}    