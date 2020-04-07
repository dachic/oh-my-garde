<?php

namespace App\Controller\Api;

use App\Repository\UserRepository;
use App\Event\UserPasswordRequestEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

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
    public function resetUserPassword(Request $request)
    {
        $content = $request->getContent();
        if (empty($content)) {
            return $this->json([
                'success' => false,
                "message" => sprintf("Vous devez fournir un email")
            ], Response::HTTP_BAD_REQUEST);
        }

    }
}
