<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Event\UserRegisteredEvent;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AuthenticationController extends AbstractController
{
    /**
     * @Route("/api/register", name="api_register")
     */
    public function index(
        Request $request,
        UserRepository $userRepository,
        ValidatorInterface $validator,
        UserPasswordEncoderInterface $encoder,
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher
    ) {
        $firstname = $request->request->get('firstname');
        $lastname = $request->request->get('lastname');
        $email = $request->request->get('email');
        $phoneNumber = $request->request->get('phoneNumber');
        $password = $request->request->get('password');
        $role = $request->request->get('role');

        if ($userRepository->findOneBy(['email' => $email])) {
            return $this->json([
                "success" => false,
                "message" => sprintf("Un utilisateur avec l'email %s existe déjà 🤪", $email)
            ]);
        }

        $user = new User();
        $user->setFirstname($firstname)
            ->setLastname($lastname)
            ->setPhoneNumber($phoneNumber)
            ->setEmail($email)
            ->addRole($role)
            ->setPassword($encoder->encodePassword($user, $password));

        $errors = $validator->validate($user);

        if (count($errors) > 0) {
            return $this->json([
                "success" => false,
                "message" => $errors[0]->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        $eventDispatcher->dispatch(
            new UserRegisteredEvent($user),
            UserRegisteredEvent::NAME
        );

        return $this->json([
            "success" => true,
            "message" => "Votre compte a bien été crée. Il sera activé le plus tôt possible"
        ], Response::HTTP_CREATED);
    }
}
