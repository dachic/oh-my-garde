<?php

namespace App\Controller\Api;

use App\Repository\UserRepository;
use App\Event\UserPasswordRequestEvent;
use App\Event\UserPasswordResettedEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class ForgotPasswordController extends AbstractController
{
    /**
     * @Route("/api/forgot-password-request", name="api_forgot_password_request", methods={"POST"})
     */
    public function generatePasswordRequestCode(
        Request $request,
        UserRepository $userRepository,
        EventDispatcherInterface $eventDispatcher,
        EntityManagerInterface $entityManager
    ) {
        $content = $request->getContent();
        if (empty($content)) {
            return $this->json([
                'success' => false,
                "message" => sprintf("Vous devez fournir un email")
            ], Response::HTTP_BAD_REQUEST);
        }

        $json = json_decode($content, true);
        if (!array_key_exists('email', $json)) {
            return $this->json([
                'success' => false,
                "message" => sprintf("Vous devez fournir un champ email")
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = $userRepository->findOneBy(['email' => $json['email']]);
        if (!$user) {
            return $this->json([
                "success" => false,
                "message" => sprintf("Vous n'êtes peut-être pas inscrits avec l'email %s", $json['email'])
            ]);
        }

        // generate password reset link send mail
        $user->setTokenCode(bin2hex(random_bytes(32)));
        $entityManager->persist($user);
        $entityManager->flush();

        $eventDispatcher->dispatch(
            new UserPasswordRequestEvent($user),
            UserPasswordRequestEvent::NAME
        );

        return $this->json([
            "success" => true,
            "message" => sprintf("Nous venons de vous envoyer un mail avec lien de réinitialisation de votre mot de passe à l'adresse emal spécifié")
        ]);
    }

    /**
     * @Route("/api/reset-password", name="api_reset_password", methods={"POST"})
     */
    public function resetUserPassword(
        Request $request,
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        UserPasswordEncoderInterface $encoder
    ) {
        $content = $request->getContent();
        if (empty($content)) {
            return $this->json([
                'success' => false,
                "message" => sprintf("Vous devez fournir un email")
            ], Response::HTTP_BAD_REQUEST);
        }

        $json = json_decode($content, true);
        if (!array_key_exists('password', $json) || !array_key_exists('token', $json)) {
            return $this->json([
                'success' => false,
                "message" => sprintf("Vous devez fournir votre nouveau mot de passe et un jeton de ré-initialisation")
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = $userRepository->findOneBy(['tokenCode' => $json['token']]);
        if (!$user) {
            return $this->json([
                "success" => false,
                "message" => sprintf("Votre lien de ré-initialisation est peut-être invalide. Réessayez avec un nouveau lien de ré-initialisation")
            ]);
        }

        $user->setTokenCode(null);
        $user->setPassword($encoder->encodePassword($user, $json['password']));
        $entityManager->persist($user);
        $entityManager->flush();

        $eventDispatcher->dispatch(
            new UserPasswordResettedEvent($user),
            UserPasswordResettedEvent::NAME
        );

        return $this->json([
            "success" => true,
            "message" => sprintf("Votre mot de passe a été correctement modifié 🔥")
        ]);
    }
}
