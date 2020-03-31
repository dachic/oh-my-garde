<?php

namespace App\EventSubscriber;

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
     * Send validation email with code and token link to validation account
     *
     * @param UserRegisteredEvent $event
     * @return void
     */
    public function sendValidationMail(UserRegisteredEvent $event)
    {
        $user = $event->getUser();
        $email = $user->getEmail();
        $subject = "Validation de votre inscription sur Oh My Garde";

        $view = $this->twig->render('emails/user/validation.html.twig', [
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
        $subject = "Nouvel utilisateur sur OuestFood";

        $users = $this->entityManager
            ->getRepository(User::class)
            ->findByRoleAsEmailKey(User::ROLE_ADMIN);

        $emails = array_keys($users);
        $view = $this->twig->render('emails/user/new.html.twig', [
            'user' => $user,
        ]);

        foreach ($emails as $email) {
            $this->mailer->send($email, $subject, $view);
        }
    }
}
