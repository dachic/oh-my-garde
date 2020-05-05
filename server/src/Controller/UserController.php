<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Guard;
use App\Repository\UserRepository;
use App\Repository\GuardRepository;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api/user")
 */
class UserController extends AbstractController
{
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
        $colors = ['primary', 'success', 'danger', 'warning', 'info'];
        foreach ($user->getInterships() as $intership) {
            foreach ($intership->getAgrements() as $agrement) {
                shuffle($colors);
                $agr = [
                    "code" => $agrement->getCode(),
                    "name" => $agrement->getName(),
                    "color" => $colors[0]
                ];
                array_push($infosAgr, $agr);
            }
            $infos = [
                'id'  => $intership->getId(),
                'position'  => $intership->getPosition(),
                'hospital'  => $intership->getHospital()->getName(),
                'agrement'  => $infosAgr,
                'creation'  => $intership->getCreatedAt()
            ];
            array_push($array, $infos);
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
        if ($user->getPharmacy() != null) {
            $infos = [
                'pharmacyId'  => $user->getPharmacy()->getId(),
            ];
        } else {
            $infos = [
                'pharmacyId'  => '',
            ];
        }
        return $this->json([
            "data" => $infos
        ]);
    }

    /**
     * Get data for export intern guards by period by hospital
     *
     * @Route("/{id}/guard/export", name="app_guard_export", methods={"GET"})
     * @Security("is_granted('ROLE_ADMIN')")
     *
     * @return JsonResponse
     */
    public function exportGuardHours(
        GuardRepository $guardRepository,
        User $user
    ): JsonResponse {
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

        if (!empty($groupedGuards)) {
            $exports = array_group_by($records, "periodName", "hospitalName");
            $ordereExports = array_merge(array_flip(['Jour', 'Nuit', 'Jour et Nuit']), $exports);

            return $this->json([
                'user' => $user,
                'data' => $ordereExports
            ]);
        }

        return $this->json(null, Response::HTTP_NOT_FOUND);
    }
}
