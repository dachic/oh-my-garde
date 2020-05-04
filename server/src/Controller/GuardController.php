<?php

namespace App\Controller;

use App\Service\MailerService;
use App\Repository\UserRepository;
use App\Repository\GuardRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GuardController extends AbstractController
{

    /**
     * @Route("/api/guard/assign/", name="app_guard_assign", methods={"POST"})
     */
    public function assign(Request $request, UserRepository $userRepository, GuardRepository $guardRepository, MailerService $mailerService)
    {
        $em = $this->getDoctrine()->getManager();
        $post = json_decode($request->getContent(), true);

        $guard = $guardRepository->find($post['guard']);
        $intern = $userRepository->find($post['intern']);

        if ($intern) {
            $guard->setUser($intern);
            $em->flush();

            $mailerService->send(
                $intern->getEmail(),
                "Demande d'attribution de garde",
                $this->render('emails/confirm_guard.html.twig', [
                    'user' => $intern,
                    'guard' => $guard
                ])
            );

            return new Response("true");
        }

        return new Response("false");
    }
}
