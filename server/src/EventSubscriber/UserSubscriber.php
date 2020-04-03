<?php

namespace App\EventSubscriber;

use App\Entity\User;
use Twig\Environment;
use App\Constant\UserRole;
use App\Constant\UserStatus;
use App\Service\MailerService;
use App\Event\UserRegisteredEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
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
            ],
            KernelEvents::VIEW => [
                'sendAccountValidationMail',
                EventPriorities::POST_WRITE
            ],
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

    /**
     * Send validation email
     *
     * @param ViewEvent $event
     * @return void
     */
    public function sendAccountValidationMail(ViewEvent $event)
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$user instanceof User || Request::METHOD_PATCH !== $method) {
            return;
        }

        $email = $user->getEmail();

        if ($user->getStatus() === UserStatus::STATUS_ENABLED) {
            $subject = "Validation de votre compte sur OhMyGarde";
            $view = $this->twig->render('mjml/emails/user/account_validated.html.twig', [
                'user' => $user,
            ]);

            $this->mailerService->send($email, $subject, $view);
        } else if ($user->getStatus() === UserStatus::STATUS_DISABLED) {
            $subject = "Désactivation de votre compte sur OhMyGarde";
            $view = $this->twig->render('mjml/emails/user/account_unvalidated.html.twig', [
                'user' => $user,
            ]);

            $this->mailerService->send($email, $subject, $view);
        }
    }
}
