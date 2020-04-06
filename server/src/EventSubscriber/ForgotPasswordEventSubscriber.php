<?php

namespace App\EventSubscriber;

use App\Service\MailerService;
use Twig\Environment;
use CoopTilleuls\ForgotPasswordBundle\Event\CreateTokenEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

final class ForgotPasswordEventSubscriber implements EventSubscriberInterface
{
    private $mailerService;
    private $twig;

    public function __construct(MailerService $mailerService, Environment $twig)
    {
        $this->mailerService = $mailerService;
        $this->twig = $twig;
    }

    public static function getSubscribedEvents()
    {
        return [
            // Symfony 4.3 and inferior, use 'coop_tilleuls_forgot_password.create_token' event name
            CreateTokenEvent::class => 'onCreateToken',
        ];
    }

    public function onCreateToken(CreateTokenEvent $event)
    {
        $passwordToken = $event->getPasswordToken();

        $user = $passwordToken->getUser();

        $subject = "Réinitialisation du mot de passe";
        $view = $this->twig->render('mjml/emails/user/forgot_password.html.twig', [
           'token' => $passwordToken->getToken(),
           'user' => $user
        ]);
        $to = $user->getEmail();

        if (0 === $this->mailerService->send($to, $subject, $view)) {
            throw new \RuntimeException('Unable to send email');
        }

        //$event->setResponse(new Response('We have no response for a JSON request', 501));
        //dd($event);
    }
}
