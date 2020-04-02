<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Event\UserRegisteredEvent;
use App\Repository\RegionRepository;
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
        RegionRepository $regionRepository,
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

        if ($userRepository->findOneBy(['email' => $params['email']])) {
            return $this->json([
                "success" => false,
                "message" => sprintf("Un utilisateur avec l'email %s existe déjà 🤪", $params['email'])
            ]);
        }

        // check region
        $hasRegion = !empty($params['region']);
        $regionEntity = false;
        if ($hasRegion) {
            $regionEntity = $regionRepository->find($params['region']);
        }

        if(!$hasRegion || !$regionEntity) {
            return $this->json([
                "success" => false,
                "message" => sprintf("La région dans laquelle vous vous inscrivez n'est pas répertoriée")
            ]);
        }

        $user = new User();

        if (!empty($params['firstname'])) {
            $user->setFirstname($params['firstname']);
        }

        if (!empty($params['lastname'])) {
            $user->setLastname($params['lastname']);
        }

        if (!empty($params['phoneNumber'])) {
            $user->setPhoneNumber($params['phoneNumber']);
        }

        if (!empty($params['email'])) {
            $user->setEmail($params['email']);
        }

        if (!empty($params['role'])) {
            $user->addRole($params['role']);
        }

        if (!empty($regionEntity)) {
            $user->setRegion($regionEntity);
        }

        $user->setPassword($encoder->encodePassword($user, $params['password']));

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
