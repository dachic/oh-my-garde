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
        $params = [];
        $content = $request->getContent();
        if (!empty($content)) {
            $params = json_decode($content, true);
        }

        extract($params); // convert all raw data key into variable $firstname, $lastname, etc...

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
            ->setEmail($email);

        if (!empty($role)) {
            $user->addRole($role);
        }
        $user->setPassword($encoder->encodePassword($user, $password));

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
        // } catch (\Throwable $th) {
        //     return $this->json([
        //         "success" => false,
        //         "message" => "Une erreur s'est produite lors de l'enregistrement des données"
        //     ], Response::HTTP_BAD_REQUEST);
        // }
    }
}
