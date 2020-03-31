<?php

namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;

/**
 * Class MailerService
 *
 * @package App\Services
 */
class MailerService
{
    /**
     * @var Mailer
     */
    private $mailer;

    /**
     * Mailer constructor.
     *
     * @param Mailer $mailer
     */
    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function send($to, string $subject, string $view): void
    {
        $message = (new Email())
            ->setFrom($_ENV['APP_EMAIL_FROM'])
            ->setTo($to)
            ->setSubject($subject)
            ->setBody($view, 'text/html');

        $this->mailer->send($message);
    }
}
