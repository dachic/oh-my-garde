<?php

namespace App\Controller;

use App\Entity\Guard;
use App\Entity\User;
use App\Service\MailerService;
use App\Repository\UserRepository;
use App\Repository\GuardRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
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

    /**
     * Export intern guard as hours
     *
     * @Route("/api/guard/export", name="app_guard_export", methods={"GET"})
     * @Security("is_granted('ROLE_ADMIN')")
     *
     * @return JsonResponse
     */
    public function exportGuardHours(
        GuardRepository $guardRepository,
        UserRepository $userRepository
    ): JsonResponse {
        $user = $userRepository->find(3);

        if (!($user instanceof User)) {
            return $this->json([
                'success' => false,
                'message' => 'Aucun utilisateur trouvé'
            ], Response::HTTP_NOT_FOUND);
        }

        $groupedGuards = $guardRepository->findAllPerPeriodByUser($user);

        $records = [];
        foreach ($groupedGuards as $groupedGuard) {
            foreach (Guard::$hoursMapping as $hour => $mapping) {
                if (!array_key_exists('mapping', $groupedGuard)) {
                    $groupedGuard['mapping'] = [];
                }

                if (!array_key_exists($hour, $groupedGuard['mapping'])) {
                    $groupedGuard['mapping'][$hour] = 0;
                }

                if ($groupedGuard['periodId'] == 1) { // jour
                    $groupedGuard['mapping'][$hour] += $mapping['day'] * $groupedGuard['guardCount'];
                } elseif ($groupedGuard['periodId'] == 2) { // nuit
                    $groupedGuard['mapping'][$hour] += $mapping['night'] * $groupedGuard['guardCount'];
                } elseif ($groupedGuard['periodId'] == 3) { // jour et nuit
                    $groupedGuard['mapping'][$hour] += $mapping['day'] * $groupedGuard['guardCount'] + $mapping['night'] * $groupedGuard['guardCount'];
                }
            }

            $records[] = $groupedGuard;
        }


        $exports = array_group_by($records, "periodName", "hospitalName");
        $ordereExports = array_merge(array_flip(['Jour', 'Nuit', 'Jour et Nuit']), $exports);

        return $this->json($ordereExports);
    }
}
