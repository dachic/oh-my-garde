<?php

namespace App\EventSubscriber;

use App\Constant\UserRole;
use App\Entity\User;
use Twig\Environment;
use App\Service\Mailer;
use App\Event\UserRegisteredEvent;
use App\Service\MailerService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UserSubscriber implements EventSubscriberInterface
{
    private $mailerService;

    private $twig;

    private $entityManager;

    public function __construct(
        MailerService $mailerService,
        Environment $twig,
        EntityManagerInterface $entityManager
    ) {
        $this->mailerService = $mailerService;

        $this->twig = $twig;

        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            UserRegisteredEvent::NAME  => [
                ['sendRegistrationMail', 0],
                ['sendValidationMail', 10],
            ]
        ];
    }

    /**
     * Send register validation mail
     *
     * @param UserRegisteredEvent $event
     * @return void
     */
    public function sendValidationMail(UserRegisteredEvent $event)
    {
        $user = $event->getUser();
        $email = $user->getEmail();
        $subject = "Confirmation d'inscription sur OhMyGarde";

        $view = $this->twig->render('mjml/emails/user/pending_registration.html.twig', [
            'user' => $user
        ]);

        $this->mailerService->send($email, $subject, $view);
    }

    /**
     * Inform admin user that a user has registered to applications
     *
     * @param UserRegisteredEvent $event
     * @return void
     */
    public function sendRegistrationMail(UserRegisteredEvent $event)
    {
        $user = $event->getUser();
        $subject = "Nouvel utilisateur sur OhMyGarde";

        $users = $this->entityManager
            ->getRepository(User::class)
            ->findByRoleAndRegionAsEmailKey(UserRole::ROLE_ADMIN, $user->getRegion());

        $emails = array_keys($users);
        $view = $this->twig->render('mjml/emails/user/validate_user.html.twig', [
            'user' => $user,
        ]);

        foreach ($emails as $email) {
            $this->mailerService->send($email, $subject, $view);
        }
    }
}
