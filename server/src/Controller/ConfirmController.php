<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Guard;
use App\Entity\Pharmacy;
use App\Entity\DisponibilityHour;
use App\Repository\UserRepository;
use App\Repository\GuardRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\DisponibilityHourRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Service\MailerService;


/**
 * @Route("/user")
 */
class ConfirmController extends AbstractController
{
    /**
     * @param User $user
     * @Route("/{id}/check/{guard}", name="user_check_guard", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function checkUser(User $user, $guard, GuardRepository $guardRepository, EntityManagerInterface $em, MailerService $mailerService): Response
    {
        $infos = [];
        //  If user exists then test guard's existence
        if ($user != null) {
            $foundGuard = $guardRepository->find($guard);

            // Guard found then check if it's user's guard
            if ($foundGuard != null) {
                // check validation succeed
                if ($user->getGuards()->contains($foundGuard)) {
                    // Update guard in database
                    $foundGuard->setStatus('accepted');
                    $em->persist($foundGuard);
                    $em->flush();

                    $pharmacyEmail = $foundGuard->getPharmacy()->getRepresentative()->getEmail();

                    // Send mail
                    $mailerService->sendWithCC($user->getEmail(), "Demande de garde acceptée !", $this->render('mjml/emails/user/confirm_guard_validation.html.twig', [
                        'user' => $user,
                        'guard' => $foundGuard
                    ]), $pharmacyEmail);

                    return $this->json([
                        "check" => "success"
                    ]);
                } else {
                    return $this->json([
                        "check" => "failure"
                    ]);
                }
            } else {
                return $this->json([
                    "check" => "failure"
                ]);
            }
        } else {
            return $this->json([
                "check" => "failure"
            ]);
        }
    }
}
